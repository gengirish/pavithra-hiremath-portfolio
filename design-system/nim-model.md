# NVIDIA NIM model choice — “Talk to My Resume” chat

## What the workload actually needs

From `src/app/api/chat/route.ts`:

| Requirement | Why it matters |
|-------------|----------------|
| **Long system prompt** | ~4k+ characters of fixed resume + policy text every turn. |
| **Instruction following** | Must obey bullets, tone, “never fabricate”, adversarial rules. |
| **Grounded Q&A** | Behaviour is RAG-like: answers should stick to injected facts, not invent employers or dates. |
| **Short answers** | `max_tokens: 500`, professional recruiter skim — latency matters. |
| **Multi-turn** | Last 10 user turns + system; context headroom helps. |
| **Safety / refusal** | Redirect off-topic; never list “weaknesses”; no chain-of-thought leakage to users. |

## Candidates on `integrate.api.nvidia.com`

### 1. `meta/llama-3.3-70b-instruct` (baseline)

- **Pros:** Strong general instruct model; predictable behaviour; no Nemotron-specific “reasoning on/off” toggles in the model card.
- **Cons:** Larger / typically slower and costlier than a distilled 49B for the same *portfolio* task quality.

### 2. `nvidia/llama-3.3-nemotron-super-49b-v1` (older)

- **Pros:** Distilled from Llama-3.3-70B-Instruct; NVIDIA post-training emphasises **English chat**, **RAG**, tool use.
- **Cons:** **v1.5** supersedes it on the same API path with better reasoning + alignment (see NVIDIA model overview).

### 3. `nvidia/llama-3.3-nemotron-super-49b-v1.5` (**recommended default**)

- **Fit:** NVIDIA describes it explicitly for **chatbots, RAG, agents**, and **instruction-following**; derivative of **Llama-3.3-70B-Instruct** with NAS for **efficiency** (better latency for a floating widget).
- **Context:** **128k** tokens — comfortable for a long system prompt + history.
- **Multilingual:** English primary; **Hindi** listed among supported languages (relevant for this profile’s market).
- **Critical detail (model card):** With an *empty* system prompt the model defaults to **reasoning ON**, which can surface internal reasoning-style content. NVIDIA’s fix is to put **`/no_think` in the system prompt** for **reasoning OFF** — appropriate for a public resume assistant where users must only see final prose.

### Models we did *not* pick as default

- **Ultra-large Nemotron (e.g. 253B / 550B):** Overkill for 500-token replies; higher cold start / rate-limit risk.
- **Nano / Mini variants:** Cheaper/faster but weaker on long policy + nuanced refusals.
- **Guard / safety-only NIMs:** Not general chat; wrong tool.

## Decision

| Setting | Value |
|---------|--------|
| **Default `NIM_MODEL`** | `nvidia/llama-3.3-nemotron-super-49b-v1.5` |
| **System prompt** | Same `SYSTEM_PROMPT`; implementation appends `\n\n/no_think` when this family is used (see `route.ts`). |
| **Sampling** | For this family: `temperature` ~0.45, `top_p` 0.95 (between NVIDIA’s reasoning-on recipe and stricter portfolio tone). |

## Override

If the catalog returns 404 for a model id, confirm the exact slug on the model’s **build.nvidia.com** page and set `NIM_MODEL`. Fallback quality path: `meta/llama-3.3-70b-instruct`.

## References

- [NVIDIA — Llama-3.3-Nemotron-Super-49B-v1.5 model card / usage](https://docs.api.nvidia.com/nim/reference/nvidia-llama-3_3-nemotron-super-49b-v1_5) (`/no_think`, temperature / top_p notes)
- [NVIDIA NIM LLM API listing](https://docs.api.nvidia.com/nim/reference/llm-apis)
