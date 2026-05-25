# Убрать чёрный фон и разрезать крылья: img/wing-left.png + img/wing-right.png
# Запуск: powershell -ExecutionPolicy Bypass -File scripts\process-wings.ps1
Add-Type -AssemblyName System.Drawing
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
if (-not $root) { $root = (Get-Location).Path }
$img = Join-Path $root "img"
$src = Join-Path $img "wings.png"
if (-not (Test-Path $src)) { $src = "C:\Users\Public\wings-src.png" }
if (-not (Test-Path $src)) { Write-Error "Положите wings.png в папку img"; exit 1 }

function New-TransparentBitmap([int]$w, [int]$h) {
  $b = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($b)
  $g.Clear([System.Drawing.Color]::FromArgb(0, 0, 0, 0))
  $g.Dispose()
  return $b
}

function Remove-Black([System.Drawing.Bitmap]$bmp, [int]$t = 52) {
  for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
      $c = $bmp.GetPixel($x, $y)
      $avg = ($c.R + $c.G + $c.B) / 3
      if ($c.R -le $t -and $c.G -le $t -and $c.B -le $t) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      } elseif ($avg -le ($t + 32)) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
      }
    }
  }
}

function Get-Bounds([System.Drawing.Bitmap]$bmp) {
  $minX = $bmp.Width; $minY = $bmp.Height; $maxX = 0; $maxY = 0
  for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
      if ($bmp.GetPixel($x, $y).A -gt 10) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  return @{ X = $minX; Y = $minY; W = ($maxX - $minX + 1); H = ($maxY - $minY + 1) }
}

function Crop-Bounds([System.Drawing.Bitmap]$bmp, $b) {
  $c = New-TransparentBitmap $b.W $b.H
  $g = [System.Drawing.Graphics]::FromImage($c)
  $g.DrawImage($bmp, 0, 0, (New-Object System.Drawing.Rectangle $b.X, $b.Y, $b.W, $b.H), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  return $c
}

$srcBmp = [System.Drawing.Bitmap]::FromFile($src)
$w = $srcBmp.Width; $h = $srcBmp.Height; $mid = [int][Math]::Floor($w / 2)
$full = New-TransparentBitmap $w $h
$g = [System.Drawing.Graphics]::FromImage($full)
$g.DrawImage($srcBmp, 0, 0); $g.Dispose()
Remove-Black $full

$leftPart = New-TransparentBitmap $mid $h
$gL = [System.Drawing.Graphics]::FromImage($leftPart)
$gL.DrawImage($full, 0, 0, (New-Object System.Drawing.Rectangle 0, 0, $mid, $h), [System.Drawing.GraphicsUnit]::Pixel)
$gL.Dispose()

$rightPart = New-TransparentBitmap ($w - $mid) $h
$gR = [System.Drawing.Graphics]::FromImage($rightPart)
$gR.DrawImage($full, 0, 0, (New-Object System.Drawing.Rectangle $mid, 0, ($w - $mid), $h), [System.Drawing.GraphicsUnit]::Pixel)
$gR.Dispose()

$left = Crop-Bounds $leftPart (Get-Bounds $leftPart)
$right = Crop-Bounds $rightPart (Get-Bounds $rightPart)
New-Item -ItemType Directory -Force -Path $img | Out-Null
$left.Save((Join-Path $img "wing-left.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$right.Save((Join-Path $img "wing-right.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "OK: $img\wing-left.png, wing-right.png"
