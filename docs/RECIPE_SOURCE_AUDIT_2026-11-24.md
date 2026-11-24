# Tito Vee’s Kitchen — Source Audit and Recipe Completeness Matrix

Reconciled November 24, 2026. Editable source of truth: Supabase `public.recipes`. Historical index: `data/recipe-catalog.json`.

**Verified live status:** 58 total records, 49 public, 9 private drafts. 51 have populated ingredient and method fields. **These are not necessarily fully measured recipes.** 51 include terms reflecting incomplete quantities, uncertainty, reconstruction, or approximate cooking.

**Unresolved site quality fields:** 32 missing yields, 57 missing prep times, 44 missing cook times, 54 missing macros, 58 without final photos.

## High-confidence source corrections during this audit

1. **All curry dishes:** User confirmed the use of **Dot’s Natural Spices curry seasoning** (maker URL https://dotsnaturalspices.com/). Four main recipes containing curry are annotated accordingly; only a product whose exact brand/SKU is known is stated definitively.
2. **June 14 Curry Chicken:** Caramelized onions + butter + Dot’s curry seasoning are source-confirmed; earlier suggestions of cream/milk/broth and blending were misrepresented as if confirmed. Moved proposed variants out of the primary ingredient list. Chicken mass and liquid quantity still unknown.
3. **October 19 Curry-Crusted Sourdough Fried Chicken Sandwich:** Distinct from the October 29 Thai red curry chicken tacos; original had 1 cup homemade crouton crumbs, ⅓ cup self-rising flour, about 2 tbsp curry seasoning, a little brown sugar, and 350°F fry.
4. **October 28–29 Thai Red Curry Crispy Chicken Tacos:** Entirely missing from previous catalog; wife-approved five stars. Recorded 2 breasts, 2 cups milk + 2 tbsp lemon, PAWS DOTS, 2-hour marinade, one-can coconut sauce + ~3 regular spoonfuls red curry paste, slaw with Kewpie, seasoned corn, 1 part flour to 2 parts panko, 350–400°F single fry.
5. **October 30 Tropical Sweet & Sour Pork Tacos:** Confirmed two tenderloins, one frozen; dry seasoning includes Dot’s Greek; marinade with ~3 oz pineapple juice; sauce reuses next-day/previous-day **Thai Red Curry Coconut Sauce**.
6. **November 14–15 Creole Salmon dinner:** Recovered omitted completed dinner, two salmon pieces, Dot’s Creole seasoning, mash with **PAWS DOTS** plus separately added brown sugar and pumpkin pie spice, pre-steamed broccoli, and canned corn soaked in equal milk/cream with Dot’s Cajun and gochujang. Wife's 7.5/10 was for the plate. Salmon dried attempting to crisp skin; planned separate skin air-fry not yet tested.
7. **Peach-Skin Simple Syrup:** Original 523 g strained peach-skin infusion with 260 g sugar, ~5-minute simmer. Total syrup batch is not the amount applied to cobbler.
8. **Fried Oxtail Stuffing Cups:** Separate development draft: savory ground-beef/breadcrumb cups with pulled braised oxtail filled AFTER cooking. Oven-formed shell test documented; finished fried-and-filled service not confirmed.
9. **Sofrito Strained Liquid:** Only the natural liquid extracted from green sofrito was reserved for potential mojo. No actual acidic mojo sauce was confirmed.
10. **Reusable components separated:** Thai Red Curry Coconut Sauce, PAWS DOTS Sweet Potato Mash, and Creamy Cajun Corn with Gochujang now have independent records and internal recipe links. These are source-recovered components, not fictional additions.

## Source handling rules

- Preserve original explicit measurements and procedural choices. Mark **unmeasured** when a recipe was seasoned by feel; do not manufacture tablespoons or minutes.
- Keep user-confirmed steps separate from assistant proposals, safety recommendations and post-hoc reconstructions.
- 'PAWS DOTS' denotes a specific seasoning product; anise/cinnamon/turmeric/parsley are product ingredients, not separately added. Pumpkin pie spice and brown sugar in mash WERE separate.
- The October 29 **Thai Red Curry Coconut Sauce** was unseasoned during sauce reduction; don't automatically add curry seasoning to the sauce just because the chicken portion used Dot's seasoning.
- Distinguish separate variants: October Thai chicken versus October pork tacos; November Cajun canned corn versus October frozen creamy corn; March versus April cookies; June/October chicken crust pizzas; sourdough versus commercial yeast brioche.
- Do not call every populated record 'final'. Many public records still lack yields/times/macros and/or have unmeasured source ratios.
- No result here establishes literal access to every historical chat message or an inaccessible v0.3–v1.2 prototype export; the audit used retrievable conversation evidence, full available source files, and the current live database.

## Record-by-record matrix

Legend: ✓ populated, — missing; ! means uncertainty language exists and should be reviewed. The columns indicate field presence only.

| Recipe | Category | Status | Ingredients | Method | Yield | Prep | Cook | Macros | Photo | Source caveat |
|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Fried Oxtail Stuffing Cups | Appetizers & Snacks | Draft | ✓ | ✓ | — | — | — | — | — | ! |
| Garlic Shrimp | Appetizers & Snacks | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Philly Cheesesteak Egg Rolls | Appetizers & Snacks | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Pork & Shrimp Dumplings | Appetizers & Snacks | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Brioche Burger Buns | Breads | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Brioche Sandwich Loaf | Breads | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Buttery Garlic Naan | Breads | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Everyday Sandwich Bread | Breads | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Homemade Buttermilk-Style Biscuits | Breads | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Homemade Italian Bread Loaf | Breads | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Italian Bread — Bread Machine Adaptation | Breads | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Pan Sobao | Breads | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Sourdough Milk Brioche Sandwich Bread | Breads | Public | ✓ | ✓ | ✓ | — | ✓ | ✓ | — | ! |
| Sourdough Starter | Breads | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Tortillas | Breads | Draft | — | — | — | — | — | — | — | — |
| Biscuits and Sausage Gravy | Breakfast | Public | ✓ | ✓ | — | — | — | — | — | — |
| Pancakes | Breakfast | Public | ✓ | ✓ | — | — | — | — | — | — |
| Smoky Espresso Sausage Gravy | Breakfast | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Confit-Garlic Naan Spread | Condiments & Foundations | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Herb-Infused Garlic Confit Ghee | Condiments & Foundations | Public | ✓ | ✓ | ✓ | — | ✓ | ✓ | — | ! |
| Infused Avocado Oil | Condiments & Foundations | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Peach-Skin Simple Syrup | Condiments & Foundations | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Puerto Rican Sofrito | Condiments & Foundations | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Sofrito Strained Liquid — Reserved Mojo Base | Condiments & Foundations | Draft | ✓ | ✓ | — | — | — | — | — | — |
| Vanilla Extract | Condiments & Foundations | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Chocolate Chunk Cookies — April Chewy Revision (provisional B) | Desserts | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Chocolate Chunk Cookies — March Original (provisional A) | Desserts | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Deep Caramel Egg-Yolk Flan | Desserts | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Signature Spiced Peach Cobbler | Desserts | Public | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | ! |
| Coquito | Drinks | Draft | ✓ | — | — | — | — | — | — | ! |
| Iced Vanilla Matcha Latte | Drinks | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| American Chinese Restaurant-Style Fried Chicken Wings | Ideas & Research | Draft | — | — | — | — | — | — | — | — |
| Garlic Bread with Reserved Confit Garlic | Ideas & Research | Draft | — | — | — | — | — | — | — | — |
| Japanese/Chinese-Style Clear Soup Investigation | Ideas & Research | Draft | — | — | — | — | — | — | — | — |
| Beef Shanks | Main Dishes | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Cast-Iron Swordfish | Main Dishes | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Chicken-Crust Personal Pizzas | Main Dishes | Public | ✓ | ✓ | ✓ | — | — | ✓ | — | ! |
| Creole Salmon with Sweet Potato Mash, Steamed Broccoli, and Cajun Corn | Main Dishes | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Curry Chicken | Main Dishes | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Curry-Crusted Sourdough Fried Chicken Sandwich with Butter Chicken Slaw | Main Dishes | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Dark-Braised Oxtail | Main Dishes | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Oxtail Steamed Buns | Main Dishes | Public | ✓ | ✓ | ✓ | — | ✓ | — | — | ! |
| Pork Loin Al-Pastor-Style Quesadillas | Main Dishes | Draft | ✓ | — | — | — | — | — | — | ! |
| Slow-Roasted Spatchcock Chicken with Potatoes | Main Dishes | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Thai Red Curry Crispy Chicken Tacos | Main Dishes | Public | ✓ | ✓ | ✓ | — | — | — | — | ! |
| Tropical Sweet & Sour Pork Tacos | Main Dishes | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Whole Fried Red Snapper | Main Dishes | Public | ✓ | ✓ | — | — | ✓ | — | — | ! |
| Carne Asada Marinade | Marinades & Sauces | Draft | ✓ | — | — | — | — | — | — | ! |
| Halal-Cart-Style White Sauce | Marinades & Sauces | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Thai Red Curry Coconut Sauce | Marinades & Sauces | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Vodka Farfalle with Fried Mozzarella | Pasta | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Brothy Pinto Beans | Rice & Sides | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Creamy Cajun Corn with Gochujang | Rice & Sides | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Oxtail-Bone Rice | Rice & Sides | Public | ✓ | ✓ | — | — | — | — | — | ! |
| PAWS DOTS Sweet Potato Mash | Rice & Sides | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Thanksgiving Stuffing | Rice & Sides | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Wok-Glazed Broccoli | Rice & Sides | Public | ✓ | ✓ | — | — | — | — | — | ! |
| Oxtail-Bone Miso Soup | Soups | Public | ✓ | ✓ | — | — | — | — | — | ! |

## Source index

| Recipe | Original trace | Evidence status |
|---|---|---|
| Fried Oxtail Stuffing Cups | September 19, 2026 cooking conversation | Partial cooking experiment and evolving construction |
| Garlic Shrimp | Prototype v0.8 | Historical recipe |
| Philly Cheesesteak Egg Rolls | Nov 22 2026 photos | Finished dish photos |
| Pork & Shrimp Dumplings | Prototype v0.8 | Historical recipe |
| Brioche Burger Buns | Prototype v0.4 and Sep 2026 bake | Historical recipe |
| Brioche Sandwich Loaf | Prototype v0.4 | Historical recipe |
| Buttery Garlic Naan | Prototype v0.4 | Historical recipe |
| Everyday Sandwich Bread | Prototype v0.8 and bread machine discussions | Historical recipe |
| Homemade Buttermilk-Style Biscuits | Nov 8 recovery | Prior recipe mentioned |
| Homemade Italian Bread Loaf | Nov 8 recovery | Prior recipe mentioned |
| Italian Bread — Bread Machine Adaptation | Nov 8 recovery | Prior recipe mentioned |
| Pan Sobao | Prototype v0.8 | Historical recipe |
| Sourdough Milk Brioche Sandwich Bread | Library PDF v1.2 | Source document found |
| Sourdough Starter | Prototype v0.8 | Historical recipe |
| Tortillas | Prototype v0.8 | Historical recipe |
| Biscuits and Sausage Gravy | Prior project audit | Composite dish discussed |
| Pancakes | Prototype v0.8 | Historical recipe |
| Smoky Espresso Sausage Gravy | Nov 8 2026 recovery | Prior recipe mentioned |
| Confit-Garlic Naan Spread | Ghee recipe optional component | Component documented |
| Herb-Infused Garlic Confit Ghee | Uploaded complete recipe file and prototype | Complete source |
| Infused Avocado Oil | Nov 8 2026 recovery | Prior recipe mentioned |
| Peach-Skin Simple Syrup | October 17, 2026 Signature Spiced Peach Cobbler v2.0 conversation | Recovered recipe component |
| Puerto Rican Sofrito | Nov 1 2026 sofrito | Cooking discussion and videos |
| Sofrito Strained Liquid — Reserved Mojo Base | November 1, 2026 Puerto Rican Sofrito cooking session | By-product collected, not an actual mojo sauce |
| Vanilla Extract | Prototype v0.8 | Historical recipe |
| Chocolate Chunk Cookies — April Chewy Revision (provisional B) | Prototype v0.8 | Historical recipe |
| Chocolate Chunk Cookies — March Original (provisional A) | Prototype v0.8 | Historical recipe |
| Deep Caramel Egg-Yolk Flan | Prototype v0.4 | Historical recipe |
| Signature Spiced Peach Cobbler | Oct 17 2026 v2.0 | Prototype v1.2 reference and cooking discussions |
| Coquito | Dec 5 2025 conversation | Ingredient list provided |
| Iced Vanilla Matcha Latte | Prototype v0.4 | Historical recipe |
| American Chinese Restaurant-Style Fried Chicken Wings | Nov 4 2026 conversation | Research discussion only |
| Garlic Bread with Reserved Confit Garlic | Nov 1 2026 conversation | Cooking plan only |
| Japanese/Chinese-Style Clear Soup Investigation | Jul 12 2026 conversation | Tasting discussion only |
| Beef Shanks | Prototype v0.4 | Historical recipe |
| Cast-Iron Swordfish | Prototype v0.4 and cooking discussions | Historical recipe |
| Chicken-Crust Personal Pizzas | Prototype v0.4 | Historical recipe |
| Creole Salmon with Sweet Potato Mash, Steamed Broccoli, and Cajun Corn | November 14–15, 2026 cooking session, wife scored 7.5/10 | Recovered tested cooking conversation |
| Curry Chicken | Prototype v0.8 | Historical recipe |
| Curry-Crusted Sourdough Fried Chicken Sandwich with Butter Chicken Slaw | Oct 19 2026 conversation | Recipe named |
| Dark-Braised Oxtail | Prototype v0.4 | Historical recipe |
| Oxtail Steamed Buns | Prototype v0.4 | Historical recipe |
| Pork Loin Al-Pastor-Style Quesadillas | Prototype v0.4 | Historical recipe |
| Slow-Roasted Spatchcock Chicken with Potatoes | Oct 2 2026 cooking session | Cooking discussion |
| Thai Red Curry Crispy Chicken Tacos | October 28–29, 2026 cooking session, user-rated five-star meal | Recovered completed cooking conversation |
| Tropical Sweet & Sour Pork Tacos | Oct 30 2026 branded PDF discussion | Branded recipe referenced |
| Whole Fried Red Snapper | Prototype v0.4 | Historical recipe |
| Carne Asada Marinade | Sep 24 2026 marinade discussion | Cooking discussion |
| Halal-Cart-Style White Sauce | Prototype v0.4 | Historical recipe |
| Thai Red Curry Coconut Sauce | October 28–30, 2026 Thai chicken tacos and next-day pork tacos | Component recovered from completed kitchen session |
| Vodka Farfalle with Fried Mozzarella | Prototype v0.8 | Historical recipe |
| Brothy Pinto Beans | Prototype v0.4 | Historical recipe |
| Creamy Cajun Corn with Gochujang | November 14–15, 2026 Creole salmon cooking conversation | Component from tested salmon dinner |
| Oxtail-Bone Rice | Prototype v0.4 | Historical recipe |
| PAWS DOTS Sweet Potato Mash | November 14–15, 2026 Creole salmon cooking conversation | Component from tested salmon dinner |
| Thanksgiving Stuffing | Prototype v0.8 | Historical recipe |
| Wok-Glazed Broccoli | Nov 8 2026 cooking session | Cooking narration |
| Oxtail-Bone Miso Soup | Prototype v0.4 | Historical recipe |

## Further review priority

1. Resolve original formula/procedure gaps for Curry Chicken, Carne Asada Marinade, Coquito, Al-Pastor Quesadillas and stand-alone Tortillas before representing these as measured recipes.
2. For published records where original quantities were improvised, decide whether to retain as explicitly unmeasured working recipes or run a measured test batch and record a new, validated revision.
3. Review macros and serving yields; most cannot be truthfully derived without measured ingredient weights or standardized portion counts.
4. Integrate finished meal photos, confirm final product brand names and tighten linked subrecipe usage.

**The full recovery is not equivalent to a complete kitchen-validated cookbook.** The website currently contains authentic source notes, some reconstructed bridging instructions, and clearly labeled gaps.