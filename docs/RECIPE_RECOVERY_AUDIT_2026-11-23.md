# Recipe recovery audit — 2026-11-23

The Supabase table `public.recipes` is the editable source for the owner Recipe Manager. `data/recipe-catalog.json` is an earlier, names-only archival reconstruction and is not a current export of fields.

## Recovery counts

50 catalog records remain in Supabase, all private drafts pending owner review.

- 6 records have both `ingredients` and `instructions` populated. **This does not mean the recipe is complete or validated.**
- 4 more have ingredients recovered but incomplete or missing instructions.
- 40 are still titles and provenance notes only.

## Both fields recovered

| Recipe | Provenance | Caveat |
|---|---|---|
| Herb-Infused Garlic Confit Ghee | Original complete uploaded TXT, recovered in earlier milestone | Full original source |
| Sourdough Milk Brioche Sandwich Bread | Library PDF Version 1.2, full contents reopened | Explicitly an unvalidated first test |
| Brioche Burger Buns | September 12, 2026 6-bun tangzhong formula from recipe conversation | The successful 4-bun bake involved a hydration adjustment; exact final adjustment not recovered |
| Confit-Garlic Naan Spread | Component documented inside complete garlic ghee source | Dependent recipe component, not separate originally created recipe |
| Wok-Glazed Broccoli | November 8, 2026 live cooking conversation | Ghee quantity ~3 tbsp; wine/soy/mushroom/pepper amounts not recorded |
| Slow-Roasted Spatchcock Chicken with Potatoes | October 2, 2026 live cooking conversation | Marinade and roasting durations not recovered |

## Ingredients / components recovered; method incomplete

- Coquito: Original ingredient list December 5, 2025. Water amount ambiguous `2½/2 cups`, coconut product and can sizes unresolved, egg-handling method unrecorded.
- Carne Asada Marinade: September 24, 2026 cooking conversation. Ingredients known, amounts unrecorded. Browning sauce discussed but not confirmed as added.
- Tropical Sweet & Sour Pork Tacos: October 30, 2026. Wife-approved dish with pineapple sauce and coconut red curry glaze; quantities/method missing.
- Pork Loin Al-Pastor-Style Quesadillas: July 2026 shopping plan. Ingredients known as preliminary plan, not the final executed recipe.

## Version preserved in private notes, NOT substituted as current recipe

- Signature Spiced Peach Cobbler: v1.0 exact earlier small-batch amounts and process recovered from October 10, 2026 conversation and appended to admin-only `recipe_editor_notes`. The approved v2.0 uses peach-skin syrup and changes whose exact formula was not recovered. The recipe remains without filled main ingredient/method fields to avoid mislabeling v1.0 as v2.0.

## Remaining 40 records

No verified complete source retrieved yet. Titles and original provenance notes remain. Do not invent instructions, promote to published or collapse distinct versions.

## Owner workflow

Open `/admin/recipes`. New labels distinguish "Ingredients + method", "Ingredients recovered", and "Title / notes only". Select a recipe and inspect the admin-only private notes. Publishing is always a manual owner action. Any recipe with partial/estimated measurements must be reviewed before publishing.

This recovery used available conversation history, the directly read v1.2 Library PDF, and the existing uploaded ghee source. It is **not** an exhaustive export of inaccessible historical v0.3/v1.2 recipe archive originals.
