# Fix broken characters in HTML files after emoji removal

function Fix-File($path, $replacements) {
    $c = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    foreach ($r in $replacements) {
        $c = $c.Replace($r[0], $r[1])
    }
    [System.IO.File]::WriteAllText($path, $c, [System.Text.Encoding]::UTF8)
    Write-Host "Fixed: $(Split-Path $path -Leaf)"
}

# ── impacts.html ────────────────────────────────────────────────────
Fix-File 'c:\Users\ratzy\Documents\Hiver_2026_BacBioInfo\Hor1200\Webstite_ACV_bouteilles\site-bouteilles\impacts.html' @(
    # CO2 fixes
    ,@('Énergie de production &amp; CO</h3>', 'Énergie de production &amp; CO&#x2082;</h3>')
    ,@('CO équivalent émis', 'CO&#x2082; équivalent émis')
    ,@('g COeq', 'g CO&#x2082;eq')
    ,@('CO · Cycle de vie', 'CO&#x2082; · Cycle de vie')
    ,@(' — bouteille', ' — bouteille')  # already fine
    # Em dash restoration in timeline headings
    ,@('1. Extraction  pétrole', '1. Extraction — pétrole')
    ,@('2. Fabrication  moulage', '2. Fabrication — moulage')
    ,@('4. Utilisation  usage', '4. Utilisation — usage')
    ,@('5. Fin de vie  recyclage', '5. Fin de vie — recyclage')
    ,@('6. Résidu final  milieu', '6. Résidu final — milieu')
    ,@('1. Extraction  sable', '1. Extraction — sable')
    ,@('2. Fusion  fabrication', '2. Fusion — fabrication')
    ,@('1. Extraction de la bauxite', '1. Extraction de la bauxite')  # no dash
    ,@('2. Raffinage  électrolyse', '2. Raffinage — électrolyse')
    ,@('3. Formage  fabrication', '3. Formage — fabrication')
    # Title fix
    ,@('Impacts des matériaux  Plastique', 'Impacts des matériaux — Plastique')
    ,@(' — bouteille 500 ml · Sources', ' — bouteille 500 ml · Sources')
    ,@('Analyse du cycle de vie  bouteille', 'Analyse du cycle de vie — bouteille')
)

# ── comparaison.html ────────────────────────────────────────────────
Fix-File 'c:\Users\ratzy\Documents\Hiver_2026_BacBioInfo\Hor1200\Webstite_ACV_bouteilles\site-bouteilles\comparaison.html' @(
    ,@('émissions de CO ', 'émissions de CO&#x2082; ')
    ,@('Émissions CO ', 'Émissions CO&#x2082; ')
    ,@('g COeq', 'g CO&#x2082;eq')
    ,@('CO émis (production)', 'CO&#x2082; émis (production)')
    ,@("'CO émis", "'CO&#x2082; émis")
    ,@('"CO émis', '"CO&#x2082; émis')
    ,@('CO émis', 'CO&#x2082; émis')
)

# ── index.html ──────────────────────────────────────────────────────
Fix-File 'c:\Users\ratzy\Documents\Hiver_2026_BacBioInfo\Hor1200\Webstite_ACV_bouteilles\site-bouteilles\index.html' @(
    ,@('<div class="meta-label">CO produit</div>', '<div class="meta-label">CO&#x2082; produit</div>')
)

Write-Host "All done."
