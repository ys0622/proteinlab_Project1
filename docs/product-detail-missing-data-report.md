# Product Detail Missing Data Report

Generated: 2026-08-18

Scope: static product JSON scan. No product values were changed.

## Summary

| Metric | Count |
|---|---:|
| Total products | 378 |
| Products with any checked issue | 23 |
| HIGH-priority issue products | 2 |
| Products without explicit image field in JSON | 378 |
| Drinks | 133 |
| Shakes | 88 |
| Bars | 100 |
| Yogurts | 57 |

## High-priority issue products

| Product ID | Working label | Category | Protein g | Link status | Missing fields |
|---|---|---|---:|---|---|
| takefit-monster-strawberry-350 | Takefit Monster Strawberry 350 | drink | 47 | MISSING | coupangUrl |
| dryou-protein-62g-matcha-450 | Dryou Protein 62g Matcha 450 | drink | 62 | MISSING | coupangUrl |

## All checked issue products

| Product ID | Working label | Category | Protein g | Link status | Missing fields |
|---|---|---|---:|---|---|
| oneuldanbaek-choco-latte-250 | Oneuldanbaek Choco Latte 250 | drink | 21 | MISSING | coupangUrl |
| mymil-furotein-gosohan-250 | Mymil Furotein Gosohan 250 | drink | 20 | MISSING | coupangUrl |
| mymil-furotein-goguma-250 | Mymil Furotein Goguma 250 | drink | 20 | MISSING | coupangUrl |
| sellex-profit-whey-protein-americano-330 | Sellex Profit Whey Protein Americano 330 | drink | 20 | MISSING | coupangUrl |
| 7eleven-junghoo-choco-protein-330 | 7eleven Junghoo Choco Protein 330 | drink | 33 | MISSING | coupangUrl |
| 7eleven-junghoo-vanilla-protein-330 | 7eleven Junghoo Vanilla Protein 330 | drink | 33 | MISSING | coupangUrl |
| takefit-monster-strawberry-350 | Takefit Monster Strawberry 350 | drink | 47 | MISSING | coupangUrl |
| puretein-choco-330 | Puretein Choco 330 | drink | 23 | MISSING | coupangUrl |
| puretein-coffee-330 | Puretein Coffee 330 | drink | 23 | MISSING | coupangUrl |
| seoulmilk-protein-energy-coffee-240 | Seoulmilk Protein Energy Coffee 240 | drink | 21 | MISSING | coupangUrl |
| oneuldanbaek-caramel-latte-250 | Oneuldanbaek Caramel Latte 250 | drink | 21 | MISSING | coupangUrl |
| oneuldanbaek-dolce-latte-250 | Oneuldanbaek Dolce Latte 250 | drink | 21 | MISSING | coupangUrl |
| ottogi-dayprotein-choco-250 | Ottogi Dayprotein Choco 250 | drink | 21 | MISSING | coupangUrl |
| ottogi-dayprotein-fivegrain-250 | Ottogi Dayprotein Fivegrain 250 | drink | 21 | MISSING | coupangUrl |
| ottogi-dayprotein-banana-250 | Ottogi Dayprotein Banana 250 | drink | 21 | MISSING | coupangUrl |
| dryou-protein-62g-matcha-450 | Dryou Protein 62g Matcha 450 | drink | 62 | MISSING | coupangUrl |
| nobrand-proteinbar-choco | Nobrand Proteinbar Choco | bar | 12 | MISSING | coupangUrl |
| labnosh-foodbar-mildchoco | Labnosh Foodbar Mildchoco | bar | 11 | MISSING | coupangUrl |
| crown-highprotein-chocobar | Crown Highprotein Chocobar | bar | 10 | MISSING | coupangUrl |
| kellogg-protein-granolabar-savory | Kellogg Protein Granolabar Savory | bar | 8 | MISSING | coupangUrl |
| myprotein-6layer-triple-chocolate-fudge-60 | Myprotein 6layer Triple Chocolate Fudge 60 | bar | 20 | MISSING | coupangUrl |
| yoplait-protein-blueberry-100 | Yoplait Protein Blueberry 100 | yogurt | 9 | MISSING | coupangUrl |
| yoplait-protein-plain-100 | Yoplait Protein Plain 100 | yogurt | 10.4 | MISSING | coupangUrl |

## Field definitions

- coupangUrl means an existing general purchase URL, not a verified ProteinLab-only affiliate mapping.
- HIGH priority is assigned to selected landing-page products and products with 40g+ protein.
- Image fields are summarized separately because ProteinLab may resolve product images through a shared image map rather than each product JSON row.
