$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

foreach ($file in @('homepage.html', 'hakkimizda.html')) {
    $path = "$root\$file"
    if (-not (Test-Path $path)) { continue }
    $content = Get-Content $path -Raw -Encoding UTF8
    
    # Asset images: assets/ -> code/assets/
    $content = $content -replace 'src="assets/', 'src="code/assets/'
    $content = $content -replace "src='assets/", "src='code/assets/"
    
    # CSS files: href="storefront.css" -> href="code/storefront.css" etc.
    $content = $content -replace 'href="(storefront|gutenberg-blocks|wc-blocks|icons|woocommerce|brands|visioncraft)\.css"', 'href="code/$1.css"'
    
    # JS files: src="visioncraft.js" -> src="code/visioncraft.js"
    $content = $content -replace 'src="visioncraft\.js"', 'src="code/visioncraft.js"'
    
    # Navigation links: href="hakkimizda.html" stays as is (same directory)
    # href="homepage.html" stays as is
    
    [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "$file updated"
}

# Update root index.html to redirect to homepage.html (not code/homepage.html)
$indexPath = "$root\index.html"
$indexContent = Get-Content $indexPath -Raw -Encoding UTF8
$indexContent = $indexContent -replace 'url=code/homepage\.html', 'url=homepage.html'
$indexContent = $indexContent -replace 'href="code/homepage\.html"', 'href="homepage.html"'
[System.IO.File]::WriteAllText($indexPath, $indexContent, [System.Text.Encoding]::UTF8)
Write-Host "index.html updated"
