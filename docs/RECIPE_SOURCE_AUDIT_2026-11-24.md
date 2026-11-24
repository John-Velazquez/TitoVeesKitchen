# Tito Vee’s Kitchen — Source-Fidelity and Recipe Completeness Audit

Audit date: November 24, 2026. Live editable source: Supabase `public.recipes`. This is a status snapshot, not a claim that all historical chats are fully accessible or every recipe has been independently verified.

**Database:** 55 records, 46 publicly available, 9 private drafts. 48 have both ingredient and method text. 48 contain language indicating an unresolved quantity, unverified step, approximation, or source ambiguity. Populated fields are *not* proof of a finished, repeatable recipe.

**Completeness gaps:** 29 lack yield, 54 lack prep time, 41 lack cook time, 51 lack macros, and 55 lack a recipe photo. Missing values must be recovered from a source or explicitly calculated/labeled as estimates; do not invent original quantities.

## What was rechecked

- Project conversation retrieval for June 14 Curry Chicken, October 19 Curry-Crusted Sourdough Fried Chicken Sandwich, October 28–29 Thai Red Curry Crispy Chicken Tacos, and October 30 Tropical Sweet & Sour Pork Tacos.
- Original November 14–15 Creole Salmon dinner and its sweet-potato mash, PAWS DOTS seasoning, broccoli, and Cajun corn; wife rated it 7.5/10 and salmon dried during skin crisping.
- October 17 peach-skin syrup component, September 19 Fried Oxtail Stuffing Cups development and November 1 reserved liquid from homemade Puerto Rican Sofrito.
- Historical catalog, publicly published Supabase recipe records, admin-only provenance, and directly retrievable uploaded recipe files. Exact older prototype export is still not located.

## Important corrections

1. User clarification: **all curry dishes used Dot’s Natural Spices curry seasoning**. Every published curry recipe now names the maker. Where exact blend SKU/dose wasn't recorded, the gap remains explicit. Specific **PAWS DOTS** is a seasoning name; its constituent spices must *not* be presented as separate additions.
2. **June 14 Curry Chicken:** Confirmed butter-caramelized onions + Dot’s curry seasoning and chicken to finish in the sauce. Prior site version wrongly described seasoning type as unknown and treated assistant-proposed liquids as options in the ingredient list; that unsupported list was removed.
3. **October 19 Fried Chicken Sandwich:** Kept separate from October 29 Thai Red Curry Chicken Tacos. Recorded the Dot’s maker without inventing an exact product variant.
4. **October 28–29 Thai Red Curry Crispy Chicken Tacos:** Recovered wife-rated five-star completed dish, previously omitted. Preserves 2 cups milk + 2 tbsp lemon, 2-hour chicken marinade, PAWS DOTS, cream of coconut + ~3 spoons Thai red curry paste, Kewpie slaw, gochujang corn, 1:2 flour-to-panko and single 350–400°F fry.
5. **October 30 Tropical Pork Tacos:** Two tenderloins (one frozen), Dot’s Greek seasoning, a pineapple-Worcestershire marinade, two-stage cast-iron sear, and use of *leftover* red curry coconut sauce are now clearly distinguished from the chicken tacos.
6. **November 14–15 Creole Salmon Dinner:** Added separately, preserving Dot’s Creole and Cajun seasonings and **PAWS DOTS** in the sweet-potato mash; pumpkin pie spice and brown sugar were independently added. Notes record the salmon drying problem and plan for separate skin crisping.
7. **October 17 Peach-Skin Syrup:** Separate component, 523 g infusion + 260 g sugar. The amount applied to one cobbler remains unknown and is not equated with a whole batch.
8. **September 19 Fried Oxtail Stuffing Cups:** Separate private draft; oven-formed cup experiment versus planned crisp fried cups filled AFTER frying. Final fried/filled serving not verified.
9. **November 1 Sofrito Mojo Base:** Separate private component; naturally extracted sofrito liquid was reserved, with no actual completed mojo sauce or added citrus/water/vinegar documented.

## Per-record completeness matrix

Legend: ✓ field populated; — missing. **!** source uncertainty expressed in recorded content. Field presence does not imply accurate or complete original measurements.

| Recipe | Status | Ingredients | Method | Yield | Prep | Cook | Macros | Photo | Source gap |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Fried Oxtail Stuffing Cups | Draft | ✓ | ✓ | — | — | — | — | — | ! |
| Garlic Shrimp | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Philly Cheesesteak Egg Rolls | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Pork & Shrimp Dumplings | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Brioche Burger Buns | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Brioche Sandwich Loaf | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Buttery Garlic Naan | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Everyday Sandwich Bread | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Homemade Buttermilk-Style Biscuits | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Homemade Italian Bread Loaf | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Italian Bread — Bread Machine Adaptation | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Pan Sobao | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Sourdough Milk Brioche Sandwich Bread | Public | ✓ | ✓ | ✓ | — | ✓ | ✓ | — | ! |
| Sourdough Starter | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Tortillas | Draft | — | — | — | — | — | — | — | — |
| Biscuits and Sausage Gravy | Public | ✓ | ✓ | — | — | — | — | — | — |
| Pancakes | Public | ✓ | ✓ | — | — | — | — | — | — |
| Smoky Espresso Sausage Gravy | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Confit-Garlic Naan Spread | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Herb-Infused Garlic Confit Ghee | Public | ✓ | ✓ | ✓ | — | ✓ | ✓ | — | ! |
| Infused Avocado Oil | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Peach-Skin Simple Syrup | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Puerto Rican Sofrito | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Sofrito Strained Liquid — Reserved Mojo Base | Draft | ✓ | ✓ | — | — | — | — | — | — |
| Vanilla Extract | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Chocolate Chunk Cookies — April Chewy Revision (provisional B) | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Chocolate Chunk Cookies — March Original (provisional A) | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Deep Caramel Egg-Yolk Flan | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Signature Spiced Peach Cobbler | Public | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ! |
| Coquito | Draft | ✓ | — | — | — | — | — | — | ! |
| Iced Vanilla Matcha Latte | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| American Chinese Restaurant-Style Fried Chicken Wings | Draft | — | — | — | — | — | — | — | — |
| Garlic Bread with Reserved Confit Garlic | Draft | — | — | — | — | — | — | — | — |
| Japanese/Chinese-Style Clear Soup Investigation | Draft | — | — | — | — | — | — | — | — |
| Beef Shanks | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Cast-Iron Swordfish | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Chicken-Crust Personal Pizzas | Public | ✓ | ✓ | ✓ | — | — | ✓ | — | ! |
| Creole Salmon with Sweet Potato Mash, Steamed Broccoli, and Cajun Corn | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Curry Chicken | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Curry-Crusted Sourdough Fried Chicken Sandwich with Butter Chicken Slaw | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Dark-Braised Oxtail | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Oxtail Steamed Buns | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Pork Loin Al-Pastor-Style Quesadillas | Draft | ✓ | — | — | — | — | — | — | ! |
| Slow-Roasted Spatchcock Chicken with Potatoes | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Thai Red Curry Crispy Chicken Tacos | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Tropical Sweet & Sour Pork Tacos | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Whole Fried Red Snapper | Public | ✓ | ✓ | — | — | ✓ | — | — | ! |
| Carne Asada Marinade | Draft | ✓ | — | — | — | — | — | — | ! |
| Halal-Cart-Style White Sauce | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Vodka Farfalle with Fried Mozzarella | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Brothy Pinto Beans | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Oxtail-Bone Rice | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Thanksgiving Stuffing | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Wok-Glazed Broccoli | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Oxtail-Bone Miso Soup | Public | ✓ | ✓ | — | — | — | — | — | ! |

## Editorial policy before future publication

- Treat user-confirmed actions and quantities as **Original**, assistant-recommended variations as **Suggested**, reasonable procedural bridges as **Reconstructed**, and estimated nutrition as **Estimated**.
- Where no measurement is available, leave the historical amount as unknown rather than inventing exact tablespoons or cook times.
- Keep technical/provenance disputes in private editor notes; public copy should emphasize usable instructions while clearly signaling consequential unresolved cooking quantities.
- Do not equate a featured ingredient's maker with an exact purchased product SKU unless verified. Brand links belong to official maker sites, not assumed affiliate products.
- Separate cooking project variants and unfinished experiments from finalized recipes; include connected component recipes and actual usage quantities when documented.
- The archive's JSON `publication` fields are historical snapshots. Supabase `status` is authoritative for the live website.
- This was a **targeted accessible-source audit**, not a literal traversal of every original message. Some original conversations and files are only accessible through retrieval excerpts and historical archives, and original missing quantities remain unresolved.