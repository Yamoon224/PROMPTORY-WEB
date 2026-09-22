"use client";

import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { Badge, Button, Card, CardBody, ErrorState, FormAlert, LoadingState, TextareaField } from "@/components/ui";
import { IconCopy, IconLock, IconStar } from "@/components/ui/icons";
import { useAuth } from "@/features/auth/AuthContext";
import { PaymentMethodModal } from "@/features/payments/PaymentMethodModal";
import type { PaymentSubmission } from "@/features/payments/PaymentMethodModal";
import { useAsyncData } from "@/hooks/useAsyncData";
import { useMutation } from "@/hooks/useMutation";
import { formatDate, formatMoney } from "@/lib/format";
import { PROMPT_STATUS_LABEL, PROMPT_STATUS_TONE } from "@/lib/labels";
import { promptService, reviewService, saleService } from "@/services";

/**
 * Fiche publique d'un prompt.
 *
 * Le contenu integral n'arrive du backend que si l'API a juge le lecteur
 * autorise (createur, achat enregistre, ou prompt gratuit) : cet ecran ne
 * fait qu'afficher ce qu'il recoit, il ne decide jamais lui-meme de le
 * masquer.
 */
export function PromptDetail({ slug }: { slug: string }) {
  const { user } = useAuth();
  const loadPrompt = useCallback(() => promptService.getPrompt(slug), [slug]);
  const { data: prompt, isLoading, error, reload } = useAsyncData(loadPrompt);

  const loadReviews = useCallback(() => (prompt ? reviewService.listReviews(prompt.id) : Promise.resolve({ data: [], meta: { current_page: 1, last_page: 1, per_page: 15, total: 0 } })), [prompt]);
  const { data: reviewPage, reload: reloadReviews } = useAsyncData(loadReviews);

  const purchase = useMutation((submission: PaymentSubmission) => saleService.purchasePrompt(prompt!.id, submission));
  const [copied, setCopied] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const submitReview = useMutation(() =>
    reviewService.submitReview(prompt!.id, rating, comment.trim() || null),
  );

  if (isLoading) return <LoadingState label="Chargement du prompt…" />;
  if (error || !prompt) return <ErrorState error={error} onRetry={reload} />;

  const isOwner = user?.id === prompt.creator?.id;
  const hasAccess = prompt.content !== null;
  const canReview = Boolean(user) && !isOwner && hasAccess;

  async function copyContent() {
    if (!prompt?.content) return;
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible (contexte non securise) : rien a faire de plus */
    }
  }

  async function onBuy(submission: PaymentSubmission) {
    const sale = await purchase.run(submission);
    if (sale) {
      setIsPaymentModalOpen(false);
      reload();
    }
  }

  async function onReview(event: FormEvent) {
    event.preventDefault();
    const created = await submitReview.run(undefined);
    if (created) {
      setComment("");
      reloadReviews();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="flex flex-col gap-6">
        <Card>
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-semibold tracking-tight">{prompt.title}</h1>
                <p className="mt-1 text-sm text-[var(--muted)]">Par {prompt.creator?.name ?? "Createur inconnu"}</p>
              </div>
              {prompt.status !== "published" ? (
                <Badge tone={PROMPT_STATUS_TONE[prompt.status]}>{PROMPT_STATUS_LABEL[prompt.status]}</Badge>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {prompt.categories?.map((category) => (
                <Badge key={`c-${category.id}`} tone="brand">
                  {category.name}
                </Badge>
              ))}
              {prompt.ia_models?.map((model) => (
                <Badge key={`m-${model.id}`} tone="info">
                  {model.name}
                </Badge>
              ))}
              {prompt.tags?.map((tag) => (
                <Badge key={`t-${tag.id}`}>{tag.name}</Badge>
              ))}
            </div>

            {typeof prompt.average_rating === "number" ? (
              <p className="flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
                <IconStar className="h-4 w-4" />
                {prompt.average_rating.toFixed(1)} sur 5
                <span className="font-normal text-[var(--muted)]">({prompt.reviews_count ?? 0} avis)</span>
              </p>
            ) : null}

            <hr className="border-[var(--hairline)]" />

            {hasAccess ? (
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Contenu du prompt</p>
                  <Button variant="secondary" size="sm" onClick={copyContent} icon={<IconCopy className="h-3.5 w-3.5" />}>
                    {copied ? "Copie !" : "Copier"}
                  </Button>
                </div>
                <pre className="whitespace-pre-wrap rounded-sm bg-[var(--surface-muted)] p-4 text-sm leading-relaxed">
                  {prompt.content}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-sm bg-[var(--surface-muted)] px-4 py-10 text-center">
                <IconLock className="h-6 w-6 text-[var(--muted)]" />
                <p className="text-sm font-semibold">Contenu reserve aux acheteurs</p>
                <p className="max-w-sm text-sm text-[var(--muted)]">
                  Achetez ce prompt pour en voir le contenu integral et pouvoir le copier.
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-col gap-4">
            <h2 className="text-sm font-bold">Avis ({reviewPage?.data.length ?? 0})</h2>

            {canReview ? (
              <form onSubmit={onReview} className="flex flex-col gap-3 rounded-sm border border-[var(--hairline)] p-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-label={`${value} etoile(s)`}
                      onClick={() => setRating(value)}
                      className="rounded-full p-0.5"
                    >
                      <IconStar className={value <= rating ? "h-5 w-5 text-amber-500" : "h-5 w-5 text-stone-300 dark:text-stone-700"} />
                    </button>
                  ))}
                </div>
                <TextareaField
                  label="Votre avis (facultatif)"
                  placeholder="Qu'avez-vous pense de ce prompt ?"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  rows={2}
                />
                {submitReview.error ? <FormAlert>Impossible d&apos;enregistrer votre avis.</FormAlert> : null}
                <Button type="submit" size="sm" isLoading={submitReview.isPending} className="self-start">
                  Publier mon avis
                </Button>
              </form>
            ) : null}

            {reviewPage && reviewPage.data.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {reviewPage.data.map((review) => (
                  <li key={review.id} className="border-b border-[var(--hairline)] pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{review.user?.name ?? "Utilisateur"}</p>
                      <p className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                        <IconStar className="h-3.5 w-3.5" />
                        {review.rating}/5
                      </p>
                    </div>
                    {review.comment ? <p className="mt-1 text-sm text-[var(--muted)]">{review.comment}</p> : null}
                    <p className="mt-1 text-xs text-[var(--muted)]">{formatDate(review.created_at)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[var(--muted)]">Aucun avis pour l&apos;instant.</p>
            )}
          </CardBody>
        </Card>
      </div>

      <div>
        <Card className="lg:sticky lg:top-24">
          <CardBody className="flex flex-col gap-4">
            <p className="font-display text-3xl font-semibold tabular-nums text-brand-700 dark:text-brand-400">
              {prompt.is_free ? "Gratuit" : formatMoney(prompt.price)}
            </p>

            {isOwner ? (
              <p className="text-sm text-[var(--muted)]">Vous etes le createur de ce prompt.</p>
            ) : hasAccess ? (
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Vous avez acces au contenu integral.
              </p>
            ) : user ? (
              <>
                <Button size="lg" className="w-full" onClick={() => setIsPaymentModalOpen(true)}>
                  Acheter pour {formatMoney(prompt.price)}
                </Button>
                <PaymentMethodModal
                  isOpen={isPaymentModalOpen}
                  onClose={() => setIsPaymentModalOpen(false)}
                  title="Acheter ce prompt"
                  amountLabel={formatMoney(prompt.price)}
                  onConfirm={onBuy}
                  isPending={purchase.isPending}
                  error={purchase.error}
                />
              </>
            ) : (
              <p className="text-sm text-[var(--muted)]">
                <a href="/connexion" className="font-semibold text-brand-600">
                  Connectez-vous
                </a>{" "}
                pour acheter ce prompt.
              </p>
            )}

            <dl className="grid grid-cols-2 gap-3 border-t border-[var(--hairline)] pt-4 text-sm">
              <div>
                <dt className="text-xs text-[var(--muted)]">Vues</dt>
                <dd className="font-semibold">{prompt.views_count}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)]">Telechargements</dt>
                <dd className="font-semibold">{prompt.downloads_count}</dd>
              </div>
            </dl>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
