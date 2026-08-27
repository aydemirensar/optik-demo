# Build static site from WP rendered HTML
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$wpHtml = Get-Content "$root\wp-rendered.html" -Raw -Encoding UTF8

# Extract body content (between <body...> and </body>)
$bodyMatch = [regex]::Match($wpHtml, '(?s)<body[^>]*>(.*)</body>')
if (-not $bodyMatch.Success) { throw "No body found" }
$body = $bodyMatch.Groups[1].Value

# URL replacements
$body = $body -replace 'http://localhost/visioncraft/wp-content/uploads/2026/08/', 'assets/'
$body = $body -replace 'http://localhost/visioncraft/wp-content/plugins/visioncraft-tools/assets/icons/', 'assets/'
$body = $body -replace 'http://localhost/visioncraft/wp-content/plugins/visioncraft-tools/assets/visioncraft\.js', 'visioncraft.js'
$body = $body -replace 'http://localhost/visioncraft/wp-content/plugins/visioncraft-tools/assets/visioncraft\.css', 'visioncraft.css'

# WP page links -> static links
$body = $body -replace 'href="/visioncraft/"', 'href="homepage.html"'
$body = $body -replace 'href="http://localhost/visioncraft/"', 'href="homepage.html"'
$body = $body -replace 'href="/visioncraft/shop/"', 'href="#"'
$body = $body -replace 'href="/visioncraft/hakkimizda/"', 'href="hakkimizda.html"'
$body = $body -replace 'href="/visioncraft/recete-yukle/"', 'href="#"'
$body = $body -replace 'href="/visioncraft/iletisim/"', 'href="#"'
$body = $body -replace 'href="/visioncraft/cart/"', 'href="#"'
$body = $body -replace 'href="/visioncraft/my-account/"', 'href="#"'
$body = $body -replace 'href="/visioncraft/checkout/"', 'href="#"'
$body = $body -replace 'href="/visioncraft/product-category/[^"]*"', 'href="#"'
$body = $body -replace 'href="/visioncraft/product/[^"]*"', 'href="#"'
$body = $body -replace 'href="/visioncraft/ana-sayfa/"', 'href="homepage.html"'

# Remove WP-specific scripts (keep visioncraft.js)
$body = $body -replace '(?s)<script id="jquery-core-js".*?</script>', ''
$body = $body -replace '(?s)<script id="jquery-migrate-js".*?</script>', ''
$body = $body -replace '(?s)<script[^>]*id="wc-[^"]*".*?</script>', ''
$body = $body -replace '(?s)<script[^>]*id="woocommerce-js".*?</script>', ''
$body = $body -replace '(?s)<script[^>]*id="storefront-[^"]*".*?</script>', ''
$body = $body -replace '(?s)<script[^>]*id="sourcebuster[^"]*".*?</script>', ''
$body = $body -replace '(?s)<script[^>]*id="wp-emoji-settings".*?</script>', ''
$body = $body -replace '(?s)<script type="application/ld\+json">.*?</script>', ''
$body = $body -replace '(?s)<script type="speculationrules">.*?</script>', ''

# Remove the inline woocommerce-no-js -> woocommerce-js script
$body = $body -replace '(?s)<script>\s*\(function \(\) \{[\s\S]*?woocommerce-no-js[\s\S]*?\}\)\(\);\s*</script>', ''

# Remove the emoji loader module script
$body = $body -replace '(?s)<script type="module">/\*! This file.*?//# sourceURL=.*?</script>', ''

# Remove WP admin bar skip links
$body = $body -replace '<a class="skip-link screen-reader-text"[^>]*>.*?</a>', ''

# Fix the visioncraft.js script tag - remove the old WP src, we'll add our own
$body = $body -replace '<script id="vc-custom-js" src="visioncraft\.js\?ver=\d+"></script>', ''

# Additional URL replacements for full localhost URLs
$body = $body -replace 'http://localhost/visioncraft/shop/', '#'
$body = $body -replace 'http://localhost/visioncraft/hakkimizda/', 'hakkimizda.html'
$body = $body -replace 'http://localhost/visioncraft/recete-yukle/', '#'
$body = $body -replace 'http://localhost/visioncraft/iletisim/', '#'
$body = $body -replace 'http://localhost/visioncraft/cart/', '#'
$body = $body -replace 'http://localhost/visioncraft/checkout/', '#'
$body = $body -replace 'http://localhost/visioncraft/my-account/', '#'
$body = $body -replace 'http://localhost/visioncraft/product-category/[^"/]*', '#'
$body = $body -replace 'http://localhost/visioncraft/product/[^"/]*', '#'
$body = $body -replace 'http://localhost/visioncraft/ana-sayfa/', 'homepage.html'
$body = $body -replace 'http://localhost/visioncraft/', 'homepage.html'

# Build the full HTML document
$html = '<!DOCTYPE html>' + "`r`n" +
'<html lang="tr">' + "`r`n" +
'<head>' + "`r`n" +
'<meta charset="UTF-8">' + "`r`n" +
'<meta name="viewport" content="width=device-width, initial-scale=1">' + "`r`n" +
'<title>VisionCraft Optik &#8212; G&#246;zl&#252;klerini Y&#252;z&#252;nde Dene</title>' + "`r`n" +
'<link rel="preconnect" href="https://fonts.googleapis.com">' + "`r`n" +
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' + "`r`n" +
'<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">' + "`r`n" +
'<link rel="stylesheet" href="storefront.css">' + "`r`n" +
'<link rel="stylesheet" href="gutenberg-blocks.css">' + "`r`n" +
'<link rel="stylesheet" href="wc-blocks.css">' + "`r`n" +
'<link rel="stylesheet" href="icons.css">' + "`r`n" +
'<link rel="stylesheet" href="woocommerce.css">' + "`r`n" +
'<link rel="stylesheet" href="brands.css">' + "`r`n" +
'<link rel="stylesheet" href="visioncraft.css">' + "`r`n" +
'</head>' + "`r`n" +
'<body class="home page woocommerce-no-js storefront-full-width-content">' + "`r`n" +
$body + "`r`n" +
'<script src="visioncraft.js"></script>' + "`r`n" +
'</body>' + "`r`n" +
'</html>'

[System.IO.File]::WriteAllText("$root\code\homepage.html", $html, [System.Text.Encoding]::UTF8)
Write-Host "homepage.html generated: $((Get-Item "$root\code\homepage.html").Length) bytes"
