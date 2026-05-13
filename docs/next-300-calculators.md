# 300 New Calculators — Batch 2

> Sister doc to `300-new-calculators.md`. Uses the same spec format. Numbering continues from #301.

---

## Format (same as Batch 1)

```
**N. Calculator Name** | `slug` | category | LucideIcon | "shortDesc (≤80 chars)"
  in:  id:kind=default, …
  out: id:format[tone,big?], …
  f:   formula or one-line algorithm
```

Categories introduced here (or extending existing ones): `biology`, `genetics`, `astronomy`, `music`, `photography`, `video`, `gardening`, `pets`, `travel`, `hospitality`, `legal`, `education`, `gaming`, `hobbies`, `fashion`, `career`. Reuse existing categories (`sports`, `health`, etc.) where appropriate.

---

# A. Biology & Medicine (30)

**301. eGFR (CKD-EPI)** | `egfr-ckdepi` | biology | HeartPulse | "Estimated GFR by CKD-EPI 2021."
in: `creatinine:number=1`, `age:number=40`, `sex:select=male`
out: `egfr:number[primary,big]`, `stage:text`
f: CKD-EPI 2021 piecewise equation

**302. Anion Gap** | `anion-gap` | biology | Activity | "Serum anion gap."
in: `Na:number=140`, `Cl:number=104`, `HCO3:number=24`
out: `gap:number[primary,big]`
f: `Na − (Cl + HCO3)`

**303. Serum Osmolality** | `serum-osmolality` | biology | Droplet | "Serum osmolality."
in: `Na:number=140`, `glucose:number=90`, `bun:number=14`
out: `osmol:number[primary,big]`
f: `2Na + glu/18 + BUN/2.8`

**304. Corrected Sodium** | `corrected-sodium` | biology | Activity | "Na corrected for glucose."
in: `Na:number=130`, `glucose:number=400`
out: `correctedNa:number[primary,big]`
f: `Na + 0.016·(glu−100)`

**305. Calcium Correction** | `calcium-correction` | biology | Activity | "Ca corrected for albumin."
in: `Ca:number=8`, `albumin:number=3`
out: `correctedCa:number[primary,big]`
f: `Ca + 0.8·(4 − alb)`

**306. CHA₂DS₂-VASc** | `cha2ds2-vasc` | biology | Heart | "Stroke risk in AF."
in: `chf:toggle=false`, `htn:toggle=true`, `age:select=65to74`, `dm:toggle=false`, `stroke:toggle=false`, `vasc:toggle=false`, `female:toggle=false`
out: `score:integer[primary,big]`, `risk:text`
f: sum of weighted clinical factors

**307. HAS-BLED** | `has-bled` | biology | Heart | "Bleeding risk on anticoagulation."
in: `htn:toggle=true`, `renal:toggle=false`, `liver:toggle=false`, `stroke:toggle=false`, `bleed:toggle=false`, `inrLabile:toggle=false`, `elderly:toggle=false`, `drugs:toggle=false`, `alcohol:toggle=false`
out: `score:integer[primary,big]`, `risk:text`
f: sum of 9 factors

**308. Wells Score (DVT)** | `wells-dvt` | biology | Activity | "DVT pretest probability."
in: `cancer:toggle=false`, `paralysis:toggle=false`, `bedridden:toggle=false`, `swelling:toggle=true`, `legPain:toggle=true`, `pittingEdema:toggle=true`, `altDiagLikely:toggle=false`
out: `score:integer[primary,big]`, `probability:text`
f: weighted sum, alternate diagnosis subtracts

**309. CHADS₂** | `chads2` | biology | Heart | "Older stroke risk score."
in: `chf:toggle=false`, `htn:toggle=true`, `age:toggle=false`, `dm:toggle=false`, `stroke:toggle=false`
out: `score:integer[primary,big]`
f: sum (stroke = 2)

**310. APACHE II** | `apache-ii` | biology | Heart | "Acute physiology + age + chronic."
in: `physiologyPoints:number=10`, `age:number=55`, `chronic:select=none`
out: `score:integer[primary,big]`
f: APS + age + chronic-health points

**311. GCS** | `gcs` | biology | Brain | "Glasgow Coma Scale."
in: `eye:select=4`, `verbal:select=5`, `motor:select=6`
out: `total:integer[primary,big]`, `severity:text`
f: `eye + verbal + motor`

**312. NEWS2** | `news2` | biology | Activity | "National Early Warning Score 2."
in: `rr:number=18`, `spo2:number=98`, `temp:number=37`, `sbp:number=120`, `hr:number=80`, `consciousness:select=alert`, `airO2:toggle=false`
out: `score:integer[primary,big]`, `triage:text`
f: NHS NEWS2 weighting

**313. MELD Score** | `meld-score` | biology | Heart | "End-stage liver disease score."
in: `bilirubin:number=2`, `inr:number=1.5`, `creatinine:number=1.2`
out: `meld:integer[primary,big]`
f: `3.78·ln bili + 11.2·ln INR + 9.57·ln Cr + 6.43`

**314. Child-Pugh** | `child-pugh` | biology | Heart | "Cirrhosis severity."
in: `bilirubin:number=2`, `albumin:number=3`, `inr:number=1.5`, `ascites:select=none`, `encephalopathy:select=none`
out: `score:integer[primary,big]`, `class:text`
f: 5 categories × {1,2,3}

**315. BSA (Mosteller)** | `bsa-mosteller` | biology | User | "Body surface area."
in: `height:number=170`, `weight:number=70`
out: `bsa:number[primary,big]`
f: `√(h·w/3600)`

**316. Pediatric Dose** | `pediatric-dose` | biology | Baby | "Weight-based dose."
in: `weight:number=15`, `mgPerKg:number=10`
out: `dose:number[primary,big]`
f: `weight·mgPerKg`

**317. Drug Half-life** | `drug-half-life` | biology | Clock | "Steady-state from half-life."
in: `halfLifeHr:number=12`, `dosesPerDay:number=2`
out: `steadyDays:number[primary,big]`
f: `~4–5 · t½ to steady state`

**318. Creatinine Clearance** | `creatinine-clearance` | biology | Droplet | "Cockcroft-Gault CrCl."
in: `age:number=40`, `weight:number=70`, `creatinine:number=1`, `sex:select=male`
out: `crCl:number[primary,big]`
f: `(140−age)·w/(72·Cr) · (0.85 if F)`

**319. IV Drip Rate** | `iv-drip-rate` | biology | Droplet | "Drops per minute."
in: `volumeMl:number=1000`, `timeMin:number=480`, `dropFactor:number=15`
out: `dropsPerMin:number[primary,big]`
f: `vol·dropFactor/time`

**320. Cardiac Output** | `cardiac-output` | biology | Heart | "CO = HR·SV."
in: `hr:number=70`, `strokeVolume:number=70`
out: `co:number[primary,big]`
f: `HR · SV / 1000` (L/min)

**321. MAP** | `map-bp` | biology | Activity | "Mean arterial pressure."
in: `sbp:number=120`, `dbp:number=80`
out: `map:number[primary,big]`
f: `(SBP + 2·DBP)/3`

**322. eAG from A1c** | `eag-from-a1c` | biology | Droplet | "eAG from HbA1c."
in: `a1c:percent=6.5`
out: `eag:number[primary,big]`
f: `28.7·A1c − 46.7`

**323. Insulin-to-Carb Ratio** | `insulin-carb-ratio` | biology | Apple | "Units per gram carb."
in: `tdd:number=50`
out: `ratio:number[primary,big]`
f: `500/TDD`

**324. Insulin Sensitivity Factor** | `insulin-isf` | biology | Activity | "ISF (correction factor)."
in: `tdd:number=50`
out: `isf:number[primary,big]`
f: `1800/TDD` (mg/dL per unit)

**325. APGAR** | `apgar` | biology | Baby | "Newborn vitality score."
in: `appearance:select=2`, `pulse:select=2`, `grimace:select=2`, `activity:select=2`, `respiration:select=2`
out: `score:integer[primary,big]`
f: sum (0–10)

**326. Bishop Score** | `bishop-score` | biology | Baby | "Cervical favorability for induction."
in: `dilation:select=0`, `effacement:select=0`, `station:select=-3`, `consistency:select=firm`, `position:select=posterior`
out: `score:integer[primary,big]`
f: standard Bishop table

**327. Mifflin-St Jeor (detailed)** | `bmr-mifflin-detailed` | biology | Flame | "Detailed BMR."
in: `weight:number=70`, `height:number=170`, `age:number=30`, `sex:select=male`
out: `bmr:integer[primary,big]`
f: `10w + 6.25h − 5a + (5 / −161)`

**328. Harris-Benedict** | `bmr-harris-benedict` | biology | Flame | "Older BMR equation."
in: `weight:number=70`, `height:number=170`, `age:number=30`, `sex:select=male`
out: `bmr:integer[primary,big]`
f: HB revised equation

**329. Katch-McArdle** | `bmr-katch-mcardle` | biology | Flame | "BMR via lean body mass."
in: `lbmKg:number=55`
out: `bmr:integer[primary,big]`
f: `370 + 21.6·LBM`

**330. Holliday-Segar Fluids** | `fluid-maintenance` | biology | Droplet | "Pediatric daily fluid need."
in: `weight:number=15`
out: `mlPerDay:integer[primary,big]`
f: 4-2-1 rule per kg

---

# B. Genetics (10)

**331. Hardy-Weinberg** | `hardy-weinberg` | genetics | Dna | "Allele/genotype frequencies."
in: `p:number=0.6`
out: `q:number`, `pp:number`, `pq:number`, `qq:number[primary,big]`
f: `p² + 2pq + q² = 1`

**332. Punnett Square** | `punnett-square` | genetics | LayoutGrid | "Offspring genotype probabilities."
in: `parent1:text=Aa`, `parent2:text=Aa`
out: `aa:percent`, `Aa:percent`, `AA:percent[primary,big]`
f: 4-cell Punnett

**333. Carrier Probability** | `carrier-probability` | genetics | Users | "Carrier risk from family history."
in: `affectedSiblings:number=1`, `inheritance:select=autosomalRecessive`
out: `prob:percent[primary,big]`
f: posterior given inheritance

**334. Allele Frequency** | `allele-frequency` | genetics | Sigma | "Allele freq from genotype counts."
in: `AA:number=40`, `Aa:number=50`, `aa:number=10`
out: `pA:number[primary,big]`, `qA:number`
f: `p = (2·AA + Aa)/(2N)`

**335. Genetic Distance (cM)** | `genetic-distance` | genetics | Move | "Recombination distance."
in: `recombinationPct:percent=10`
out: `cm:number[primary,big]`
f: Haldane: `−0.5·ln(1−2r)·100`

**336. DNA → Protein Length** | `dna-protein-length` | genetics | Dna | "Amino-acid count from coding DNA."
in: `dnaBases:number=999`
out: `aaCount:integer[primary,big]`
f: `bases/3 − 1` (stop)

**337. PCR Cycle Yield** | `pcr-yield` | genetics | RotateCw | "Theoretical PCR copies."
in: `initialCopies:number=100`, `cycles:number=30`, `efficiency:percent=95`
out: `copies:number[primary,big]`
f: `N₀·(1+eff)^n`

**338. DNA Oligo Tm (Wallace)** | `dna-tm` | genetics | Thermometer | "Wallace melting temp."
in: `aCount:number=8`, `tCount:number=8`, `gCount:number=6`, `cCount:number=6`
out: `tm:number[primary,big]`
f: `2(A+T) + 4(G+C)`

**339. GC Content** | `gc-content` | genetics | Percent | "GC fraction in DNA."
in: `sequence:text=ATGCGCATGC`
out: `gc:percent[primary,big]`
f: `(G+C)/total · 100`

**340. LOD Score** | `lod-score` | genetics | Sigma | "Linkage LOD."
in: `recombinant:number=20`, `nonRecombinant:number=80`, `theta:number=0.2`
out: `lod:number[primary,big]`
f: `log10[ L(θ)/L(0.5) ]`

---

# C. Astronomy & Space (20)

**341. Light Travel Time** | `light-travel-time` | astronomy | Star | "Time for light over distance."
in: `distanceKm:number=149.6e6`
out: `minutes:number[primary,big]`
f: `d/c`

**342. Light-year → km** | `lightyear-km` | astronomy | Star | "Light-years to km."
in: `lightYears:number=4.24`
out: `km:number[primary,big]`
f: `ly · 9.461e12`

**343. Parsec ↔ ly** | `parsec-ly` | astronomy | Star | "Parsec to ly."
in: `parsecs:number=1`
out: `lightYears:number[primary,big]`
f: `1 pc = 3.262 ly`

**344. Apparent vs Absolute Magnitude** | `magnitude` | astronomy | Star | "Distance modulus."
in: `apparent:number=5`, `distancePc:number=10`
out: `absolute:number[primary,big]`
f: `M = m − 5·log10(d/10)`

**345. Telescope Magnification** | `telescope-magnification` | astronomy | Eye | "Mag = f_obj / f_eye."
in: `focalObjMm:number=1000`, `focalEyeMm:number=10`
out: `mag:number[primary,big]`
f: `f_obj/f_eye`

**346. Telescope Resolution (Dawes)** | `telescope-resolution` | astronomy | Eye | "Dawes' limit."
in: `apertureMm:number=100`
out: `arcsec:number[primary,big]`
f: `116/aperture(mm)`

**347. Kepler's Third Law** | `keplers-third` | astronomy | Globe | "Orbital period from axis."
in: `auAxis:number=1`
out: `years:number[primary,big]`
f: `T² = a³`

**348. Schwarzschild Radius** | `schwarzschild` | astronomy | Atom | "BH event horizon."
in: `massKg:number=1.989e30`
out: `radiusM:number[primary,big]`
f: `r = 2GM/c²`

**349. Surface Gravity** | `surface-gravity` | astronomy | Globe | "g = GM/r²."
in: `mass:number=5.972e24`, `radius:number=6.371e6`
out: `g:number[primary,big]`
f: `GM/r²`

**350. Hubble Recession** | `hubble-distance` | astronomy | Star | "Velocity from H₀."
in: `distanceMpc:number=100`, `h0:number=70`
out: `velocityKmS:number[primary,big]`
f: `v = H₀·d`

**351. Sidereal vs Solar Day** | `sidereal-solar` | astronomy | Sun | "Convert day types."
in: `solarHours:number=24`
out: `siderealHours:number[primary,big]`
f: `23.9344 hrs sidereal`

**352. Solar Insolation** | `solar-insolation` | astronomy | Sun | "Daily insolation at latitude."
in: `latitude:number=20`, `dayOfYear:number=180`
out: `kwhPerM2:number[primary,big]`
f: integrate solar irradiance

**353. Moon Illumination %** | `moon-illumination` | astronomy | Moon | "Lit fraction by date."
in: `date:date`
out: `illumPct:percent[primary,big]`, `phaseName:text`
f: synodic phase angle

**354. Lunar Tide Range** | `tide-range` | astronomy | Waves | "Approximate tidal range."
in: `moonDistanceKm:number=384400`
out: `rangeM:number[primary,big]`
f: scales as 1/d³

**355. Eclipse Magnitude** | `eclipse-magnitude` | astronomy | Moon | "Eclipse magnitude estimate."
in: `obscuration:percent=70`
out: `magnitude:number[primary,big]`
f: obscured/lunar diameter ratio

**356. Wien's Displacement** | `wien` | astronomy | Sun | "Peak wavelength from T."
in: `tempK:number=5800`
out: `peakNm:number[primary,big]`
f: `λ = 2.898e-3/T · 1e9`

**357. Stellar Lifetime** | `stellar-lifetime` | astronomy | Sun | "Main-sequence lifetime."
in: `solarMasses:number=1`
out: `gyr:number[primary,big]`
f: `~10/M^2.5` Gyr

**358. Drake Equation** | `drake-equation` | astronomy | Star | "Civilizations in our galaxy."
in: `R:number=2`, `fp:number=0.5`, `ne:number=0.2`, `fl:number=0.5`, `fi:number=0.1`, `fc:number=0.1`, `L:number=10000`
out: `N:number[primary,big]`
f: `N = R·fp·ne·fl·fi·fc·L`

**359. Roche Limit** | `roche-limit` | astronomy | Globe | "Tidal disruption distance."
in: `primaryDensity:number=5515`, `satelliteDensity:number=3340`, `primaryRadius:number=6.371e6`
out: `roche:number[primary,big]`
f: `d ≈ R·(2ρp/ρs)^(1/3)`

**360. Angular Size** | `angular-size` | astronomy | Eye | "Angular size from real size + distance."
in: `sizeKm:number=3474`, `distanceKm:number=384400`
out: `arcmin:number[primary,big]`
f: `2·atan(d/(2D)) · 60`

---

# D. Music & Audio (20)

**361. BPM → Delay (ms)** | `bpm-delay` | music | Music | "Delay time for BPM."
in: `bpm:number=120`, `note:select=quarter`
out: `delayMs:number[primary,big]`
f: `60000/BPM · noteFraction`

**362. Note Frequency** | `note-frequency` | music | Music | "Frequency of MIDI note."
in: `midiNote:number=69`
out: `hz:number[primary,big]`
f: `f = 440·2^((n−69)/12)`

**363. Pitch in Cents** | `pitch-cents` | music | Music | "Cents between two frequencies."
in: `f1:number=440`, `f2:number=442`
out: `cents:number[primary,big]`
f: `1200·log2(f2/f1)`

**364. Tempo Scaler** | `tempo-scaler` | music | Music | "Rescaled BPM."
in: `originalBpm:number=120`, `targetBpm:number=140`, `lengthSec:number=180`
out: `newLengthSec:number[primary,big]`
f: `len·orig/target`

**365. Reverb RT60** | `rt60` | music | Music | "Room reverb time (Sabine)."
in: `volumeM3:number=200`, `absorptionM2Sabin:number=30`
out: `rt60:number[primary,big]`
f: `0.161·V/A`

**366. Speaker Wattage Need** | `speaker-watts` | music | Speaker | "Required amp power."
in: `targetSpl:number=110`, `sensitivity:number=90`, `distanceM:number=3`
out: `watts:number[primary,big]`
f: solve W in SPL = sens + 10·log W − 20·log d

**367. dB ↔ Linear Gain** | `db-gain` | music | Volume2 | "dB ↔ linear."
in: `value:number=6`, `direction:select=dbToLinear`
out: `result:number[primary,big]`
f: `linear = 10^(dB/20)`

**368. SPL Sum** | `spl-sum` | music | Volume2 | "Combine two SPL sources."
in: `spl1:number=85`, `spl2:number=85`
out: `combined:number[primary,big]`
f: `10·log10(10^(s1/10)+10^(s2/10))`

**369. Octave Ratio** | `octave-ratio` | music | Music | "Frequency ratio per octaves."
in: `octaves:number=2`
out: `ratio:number[primary,big]`
f: `2^octaves`

**370. Audio Wavelength** | `audio-wavelength` | music | Waves | "λ at speed of sound."
in: `frequencyHz:number=440`, `speedOfSound:number=343`
out: `meters:number[primary,big]`
f: `λ = v/f`

**371. Mic SPL Limit** | `mic-spl-limit` | music | Mic | "Max SPL before distortion."
in: `sensitivity:number=−40`, `maxOutputDbu:number=10`
out: `maxSpl:number[primary,big]`
f: max-output − sensitivity (dB ref 1Pa)

**372. PA Coverage** | `pa-coverage` | music | Speaker | "Throw distance for coverage."
in: `widthM:number=10`, `dispersionDeg:number=90`
out: `throwM:number[primary,big]`
f: `width / (2·tan(θ/2))`

**373. Headroom** | `audio-headroom` | music | Volume2 | "Clip − peak."
in: `clipDbfs:number=0`, `peakDbfs:number=−6`
out: `headroom:number[primary,big]`
f: `clip − peak`

**374. LUFS Target** | `lufs-target` | music | Volume2 | "Gain to match LUFS."
in: `currentLufs:number=−18`, `targetLufs:number=−14`
out: `gainDb:number[primary,big]`
f: `target − current`

**375. Tap Tempo** | `tap-tempo` | music | Hand | "BPM from tap intervals."
in: `intervalsMs:textarea`
out: `bpm:number[primary,big]`
f: `60000/avg(intervals)`

**376. Beat Length** | `beat-length` | music | Music | "Seconds per beat."
in: `bpm:number=120`
out: `seconds:number[primary,big]`
f: `60/BPM`

**377. Phon → Sone** | `phon-sone` | music | Volume2 | "Loudness in sones."
in: `phon:number=40`
out: `sone:number[primary,big]`
f: `2^((phon−40)/10)`

**378. Music Interval (semitones)** | `music-interval` | music | Music | "Semitones between notes."
in: `noteA:text=C4`, `noteB:text=G4`
out: `semitones:integer[primary,big]`
f: parse to MIDI; difference

**379. Vinyl RPM Pitch Error** | `vinyl-rpm-error` | music | Disc | "Cents from RPM drift."
in: `actualRpm:number=33.4`, `targetRpm:number=33.333`
out: `cents:number[primary,big]`
f: `1200·log2(actual/target)`

**380. Audio File Size** | `audio-file-size` | music | FileAudio | "Uncompressed audio size."
in: `seconds:number=60`, `sampleRate:number=44100`, `bitDepth:number=16`, `channels:number=2`
out: `mb:number[primary,big]`
f: `(rate·depth·ch·time)/8/1024²`

---

# E. Photography (15)

**381. Depth of Field** | `dof` | photography | Camera | "DoF given aperture + distance."
in: `focalMm:number=50`, `aperture:number=2.8`, `distanceM:number=3`, `coc:number=0.03`
out: `dofM:number[primary,big]`, `near:number`, `far:number`
f: hyperfocal + near/far formulas

**382. Hyperfocal Distance** | `hyperfocal` | photography | Camera | "Hyperfocal distance."
in: `focalMm:number=50`, `aperture:number=8`, `coc:number=0.03`
out: `meters:number[primary,big]`
f: `H = f²/(N·c) + f`

**383. Exposure Value (EV)** | `exposure-value` | photography | Sun | "EV from aperture+shutter."
in: `aperture:number=2.8`, `shutter:number=0.01`
out: `ev:number[primary,big]`
f: `EV = log2(N²/t)`

**384. Equivalent Exposure** | `equivalent-exposure` | photography | Sun | "Same EV at new aperture."
in: `aperture:number=2.8`, `shutter:number=0.01`, `iso:number=100`, `newAperture:number=5.6`
out: `newShutter:number[primary,big]`, `newIso:integer`
f: maintain EV with reciprocity

**385. Field of View** | `field-of-view` | photography | Eye | "FoV from focal + sensor."
in: `focalMm:number=50`, `sensorWidthMm:number=36`
out: `degrees:number[primary,big]`
f: `2·atan(sensor/(2·focal))`

**386. Crop Factor** | `crop-factor` | photography | Crop | "Full-frame equivalent focal."
in: `focalMm:number=35`, `cropFactor:number=1.5`
out: `equivMm:number[primary,big]`
f: `focal·crop`

**387. Print Size (DPI)** | `print-size-dpi` | photography | Image | "Max print at DPI."
in: `pixelsW:number=6000`, `pixelsH:number=4000`, `dpi:number=300`
out: `inchesW:number`, `inchesH:number[primary,big]`
f: `px/DPI`

**388. ISO Stops** | `iso-doubling` | photography | Camera | "Stops between ISO."
in: `iso1:number=100`, `iso2:number=3200`
out: `stops:number[primary,big]`
f: `log2(iso2/iso1)`

**389. Sunny 16 Rule** | `sunny-16` | photography | Sun | "Shutter at f/16 from ISO."
in: `iso:number=100`
out: `shutter:text[primary,big]`
f: `t = 1/ISO`

**390. Hyperfocal Near Focus** | `hyperfocal-sharpness` | photography | Camera | "Near focus at hyperfocal."
in: `hyperfocalM:number=10`
out: `nearFocusM:number[primary,big]`
f: `H/2`

**391. 500 Rule (Star Trails)** | `star-trail-500` | photography | Star | "Max shutter to avoid trails."
in: `focalMm:number=24`, `crop:number=1.5`
out: `maxSec:number[primary,big]`
f: `500/(focal·crop)`

**392. Time-lapse Frames** | `timelapse-frames` | photography | Video | "Frames + playback length."
in: `intervalSec:number=5`, `realHours:number=2`, `fps:number=24`
out: `frames:integer[primary,big]`, `playbackSec:number`
f: `frames = hours·3600/interval`

**393. Flash Guide Number** | `flash-gn` | photography | Zap | "Distance from GN."
in: `gn:number=40`, `aperture:number=8`, `iso:number=100`
out: `meters:number[primary,big]`
f: `d = GN/N · √(ISO/100)`

**394. Photo File Size** | `photo-file-size` | photography | FileImage | "Uncompressed image size."
in: `pixelsW:number=6000`, `pixelsH:number=4000`, `bytesPerPixel:number=3`
out: `mb:number[primary,big]`
f: `W·H·bpp/1e6`

**395. Aperture Stops** | `aperture-stops` | photography | Aperture | "Stops between f-numbers."
in: `from:number=2.8`, `to:number=11`
out: `stops:number[primary,big]`
f: `2·log2(to/from)`

---

# F. Cinema / Video (10)

**396. Video File Size** | `video-file-size` | video | Video | "Storage for video."
in: `bitrateMbps:number=20`, `durationMin:number=60`
out: `gb:number[primary,big]`
f: `rate·time·60/8/1024`

**397. Frame Count** | `video-frame-count` | video | Video | "Total frames in clip."
in: `seconds:number=120`, `fps:number=24`
out: `frames:integer[primary,big]`
f: `seconds·fps`

**398. Aspect Ratio Crop** | `aspect-ratio-crop` | video | Crop | "Crop dims to target aspect."
in: `width:number=1920`, `height:number=1080`, `targetAspect:text=1:1`
out: `cropW:integer[primary,big]`, `cropH:integer`
f: smaller-dimension constraint

**399. Render Time** | `render-time` | video | Clock | "Approximate render time."
in: `clipMinutes:number=10`, `renderRatio:number=2`
out: `renderMin:number[primary,big]`
f: `clip · ratio`

**400. Bitrate Recommendation** | `video-bitrate` | video | Video | "Recommended bitrate."
in: `width:number=1920`, `height:number=1080`, `fps:number=30`
out: `mbps:number[primary,big]`
f: `~0.07·W·H·fps/1e6`

**401. Color Depth Storage** | `color-depth-storage` | video | Palette | "MB per frame."
in: `width:number=1920`, `height:number=1080`, `bitDepth:number=10`
out: `mb:number[primary,big]`
f: `W·H·3·bd/8/1e6`

**402. Time-Code Add** | `timecode-add` | video | Clock | "Add SMPTE timecodes."
in: `tcA:text=00:01:30:12`, `tcB:text=00:00:45:18`, `fps:number=24`
out: `result:text[primary,big]`
f: convert to frames, add, format

**403. Drop-Frame Conversion** | `drop-frame` | video | Clock | "29.97 drop ↔ non-drop."
in: `timecode:text=01:00:00;00`, `direction:select=dropToNonDrop`
out: `result:text[primary,big]`
f: drop-frame adjustment per minute

**404. Audio Sync Offset** | `audio-sync-offset` | video | Volume2 | "Compensation in frames."
in: `audioDelayMs:number=80`, `fps:number=24`
out: `frames:number[primary,big]`
f: `delay·fps/1000`

**405. CDN Streaming Bandwidth** | `cdn-bandwidth` | video | Network | "Egress for streamed video."
in: `concurrentViewers:number=1000`, `bitrateMbps:number=5`
out: `totalMbps:number[primary,big]`
f: `viewers · bitrate`

---

# G. Gardening & Farming (20)

**406. Garden Soil Volume** | `garden-soil` | gardening | Sprout | "Soil for raised bed."
in: `lengthM:number=2`, `widthM:number=1`, `depthCm:number=30`
out: `liters:number[primary,big]`
f: `L·W·D · 1000`

**407. Fertilizer Application** | `fertilizer-application` | gardening | Leaf | "Grams of fertilizer/area."
in: `areaM2:number=20`, `gramsPerM2:number=50`
out: `total:integer[primary,big]`
f: `area · rate`

**408. NPK Blend** | `npk-mix` | gardening | Leaf | "Blend two NPKs."
in: `a:text=10-10-10`, `b:text=5-15-30`, `ratio:number=1`
out: `npk:text[primary,big]`
f: weighted avg per nutrient

**409. Compost C:N Ratio** | `compost-ratio` | gardening | Recycle | "Brown:green mix."
in: `greens:number=20`, `browns:number=60`
out: `ratio:number[primary,big]`
f: `browns/greens`

**410. Garden Watering Need** | `garden-watering` | gardening | Droplet | "Liters/day per area."
in: `areaM2:number=10`, `cropFactor:number=0.7`, `etcMm:number=5`
out: `litersPerDay:number[primary,big]`
f: `area · crop · et`

**411. Plant Spacing** | `plant-spacing` | gardening | LayoutGrid | "Plants per plot."
in: `lengthM:number=10`, `widthM:number=5`, `spacingCm:number=30`
out: `count:integer[primary,big]`
f: `(L/s+1)·(W/s+1)`

**412. Mulch Volume** | `mulch-volume` | gardening | Trees | "Mulch m³ for area."
in: `areaM2:number=20`, `depthCm:number=5`
out: `m3:number[primary,big]`
f: `area · depth/100`

**413. Pesticide Dilution** | `pesticide-dilution` | gardening | Beaker | "Mix to target rate."
in: `tankL:number=10`, `rateMlPerL:number=2`
out: `productMl:number[primary,big]`
f: `tank · rate`

**414. Crop Yield** | `crop-yield` | gardening | Wheat | "Total from per-plant yield."
in: `plants:number=20`, `yieldPerPlantKg:number=2`
out: `totalKg:number[primary,big]`
f: `plants · yield`

**415. Greenhouse Heating** | `greenhouse-heating` | gardening | Flame | "kW required."
in: `volumeM3:number=50`, `tempDiffC:number=20`, `uValue:number=4`
out: `kw:number[primary,big]`
f: `Q = U·A·ΔT`

**416. Soil pH Correction** | `soil-ph-correction` | gardening | TestTube | "Lime/sulfur kg/m²."
in: `currentPh:number=5`, `targetPh:number=6.5`, `texture:select=loam`
out: `kgPerM2:number[primary,big]`
f: pH delta × texture coefficient

**417. Rainwater Harvest** | `rainwater-harvest` | gardening | Droplet | "Liters captured."
in: `roofAreaM2:number=100`, `rainfallMm:number=20`, `efficiency:percent=85`
out: `liters:number[primary,big]`
f: `area·rain·eff/1000`

**418. Seed Germination Rate** | `seed-germination` | gardening | Sprout | "% germinated."
in: `germinated:number=85`, `seeded:number=100`
out: `rate:percent[primary,big]`
f: `germinated/seeded · 100`

**419. Tree Age (rings)** | `tree-age` | gardening | TreePine | "Age from diameter."
in: `diameterCm:number=60`, `growthFactor:number=4`
out: `years:number[primary,big]`
f: `cm · factor`

**420. Hydroponic EC** | `hydroponics-ec` | gardening | Beaker | "Target EC for crop."
in: `crop:select=lettuce`
out: `ec:number[primary,big]`
f: per-crop table

**421. Garden ROI** | `garden-roi` | gardening | Coins | "Savings vs market."
in: `harvestKg:number=50`, `marketPricePerKg:currency=80`, `costs:currency=1000`
out: `roi:currency-inr[primary,big]`
f: `value − costs`

**422. Drip Irrigation Flow** | `drip-flow` | gardening | Droplet | "Liters per hour total."
in: `emitters:number=20`, `flowPerEmitter:number=4`
out: `totalLph:number[primary,big]`
f: `n · flow`

**423. Cattle Feed Required** | `cattle-feed` | gardening | Wheat | "Daily feed for herd."
in: `cattleCount:number=10`, `feedPerHeadKg:number=12`
out: `totalKgPerDay:number[primary,big]`
f: `count · per-head`

**424. Cow Milk Yield** | `milk-yield` | gardening | Milk | "Annual milk yield."
in: `dailyL:number=18`, `lactationDays:number=305`
out: `annualL:number[primary,big]`
f: `daily · days`

**425. Crop Water Footprint** | `crop-water-footprint` | gardening | Droplet | "Liters per kg crop."
in: `evapotranspirationMm:number=600`, `yieldKgPerHa:number=4000`
out: `litersPerKg:number[primary,big]`
f: `mm·10/(kg/ha)·1000`

---

# H. Pets / Veterinary (15)

**426. Dog Years** | `dog-years` | pets | Dog | "Human-equivalent dog age."
in: `dogYears:number=5`, `size:select=medium`
out: `humanYears:number[primary,big]`
f: piecewise by breed size

**427. Cat Years** | `cat-years` | pets | Cat | "Human-equivalent cat age."
in: `catYears:number=5`
out: `humanYears:number[primary,big]`
f: first 2y rapid, then +4/year

**428. Pet Calorie Need** | `pet-calorie-need` | pets | Bone | "Daily kcal."
in: `weightKg:number=20`, `activity:select=normal`, `species:select=dog`
out: `kcal:integer[primary,big]`
f: `RER · multiplier` (RER = 70·kg^0.75)

**429. Pet Food Quantity** | `pet-food-quantity` | pets | Bone | "Daily food (g)."
in: `dailyKcal:number=800`, `foodKcalPerG:number=4`
out: `grams:integer[primary,big]`
f: `kcal/kcalPerG`

**430. Cat Litter Need** | `cat-litter-need` | pets | Cat | "Monthly litter use."
in: `cats:number=2`, `kgPerCatPerMonth:number=4`
out: `kgPerMonth:integer[primary,big]`
f: `cats · rate`

**431. Pet Water Intake** | `pet-water-intake` | pets | Droplet | "Daily ml of water."
in: `weightKg:number=15`
out: `mlPerDay:integer[primary,big]`
f: `~50 ml/kg`

**432. Dog Treat Calories** | `dog-treat-calories` | pets | Bone | "Daily treat allowance."
in: `dailyKcal:number=800`
out: `treatKcal:integer[primary,big]`
f: `daily · 10%`

**433. Aquarium Volume** | `aquarium-volume` | pets | Fish | "Tank volume (L)."
in: `lengthCm:number=80`, `widthCm:number=35`, `heightCm:number=40`
out: `liters:number[primary,big]`
f: `L·W·H/1000`

**434. Aquarium Filter Sizing** | `aquarium-filter` | pets | Fish | "Filter GPH from tank."
in: `tankLiters:number=100`
out: `targetGph:number[primary,big]`
f: `4–5× tank volume per hour`

**435. Aquarium Heater W** | `aquarium-heater` | pets | Flame | "Heater watt rating."
in: `tankLiters:number=100`, `targetDeltaC:number=5`
out: `watts:integer[primary,big]`
f: `3–5 W per liter for ΔT`

**436. Pet Crate Size** | `pet-crate-size` | pets | Box | "Recommended crate size."
in: `lengthCm:number=80`, `heightCm:number=50`
out: `crateLenCm:integer[primary,big]`, `crateHeightCm:integer`
f: `length + 10` etc.

**437. Pet Vaccination Due** | `pet-vaccination` | pets | Syringe | "Booster due date."
in: `lastShot:date`, `vaccine:select=DHPP`
out: `nextDue:date[primary,big]`
f: per-vaccine interval

**438. Pet Insurance Premium** | `pet-insurance-premium` | pets | Shield | "Indicative premium."
in: `species:select=dog`, `ageYears:number=3`, `sumInsured:currency=50000`
out: `monthly:currency-inr[primary,big]`
f: per-species rate × age factor

**439. Bird Cage Size** | `bird-cage-size` | pets | Bird | "Recommended cage volume."
in: `species:select=cockatiel`
out: `minDimCm:text[primary,big]`
f: species table

**440. Reptile Heat Output** | `reptile-heat` | pets | Flame | "Watt rating for enclosure."
in: `tankLiters:number=200`, `tempDiffC:number=12`
out: `watts:integer[primary,big]`
f: `liters · ΔT · 0.5`

---

# I. Travel & Aviation (20)

**441. Flight Time** | `flight-time` | travel | Plane | "Estimate flight duration."
in: `distanceKm:number=2000`, `avgSpeedKmh:number=850`
out: `hours:number[primary,big]`
f: `d/v`

**442. Jet Lag Days** | `jet-lag` | travel | Clock | "Recovery days."
in: `tzHours:number=10`
out: `days:number[primary,big]`
f: `0.67·hours`

**443. Time-Zone Difference** | `tz-difference` | travel | Globe | "Difference between zones."
in: `fromTz:text=Asia/Kolkata`, `toTz:text=America/New_York`
out: `diffHours:number[primary,big]`
f: offset diff

**444. Trip Budget** | `trip-budget` | travel | Wallet | "Daily + total trip cost."
in: `dailyBudget:currency=5000`, `days:number=10`, `flight:currency=30000`, `misc:currency=10000`
out: `total:currency-inr[primary,big]`
f: `daily·days + flight + misc`

**445. FX Markup Fee** | `fx-fee` | travel | DollarSign | "Cost of FX markup."
in: `amount:currency=100000`, `markupPct:percent=2.5`
out: `fee:currency-inr[primary,big]`
f: `amount · markup%`

**446. Travel Insurance Need** | `travel-insurance-need` | travel | Shield | "Sum-insured suggestion."
in: `destination:select=schengen`, `tripDays:number=14`
out: `recommended:currency-inr[primary,big]`
f: tier-based lookup

**447. Visa Fee Total** | `visa-fee-total` | travel | FileText | "Total visa costs."
in: `applicationFee:currency=10000`, `serviceFee:currency=2000`, `courier:currency=500`
out: `total:currency-inr[primary,big]`
f: sum

**448. Driving Time** | `driving-time` | travel | Car | "Time to drive."
in: `distanceKm:number=300`, `avgKmh:number=60`, `breakMin:number=30`
out: `hours:number[primary,big]`
f: `d/v + breaks/60`

**449. Hotel Total Stay** | `hotel-total` | travel | Hotel | "Total hotel cost."
in: `nightlyRate:currency=8000`, `nights:number=5`, `taxPct:percent=18`
out: `total:currency-inr[primary,big]`
f: `nightly·nights·(1+tax%)`

**450. Miles to Cash** | `miles-to-cash` | travel | Star | "Cash value of points."
in: `points:number=50000`, `centsPerPoint:number=1.5`
out: `cashValue:currency[primary,big]`
f: `points · cpp/100`

**451. Excess Baggage Fee** | `baggage-fee` | travel | Briefcase | "Cost of excess kg."
in: `excessKg:number=10`, `feePerKg:currency=500`
out: `fee:currency-inr[primary,big]`
f: `excess · rate`

**452. Taxi Fare Estimate** | `taxi-estimate` | travel | Car | "Indicative cab fare."
in: `distanceKm:number=12`, `perKm:currency=20`, `base:currency=50`, `waitMin:number=5`, `waitPerMin:currency=2`
out: `total:currency-inr[primary,big]`
f: base + km·rate + wait·rate

**453. Walk vs Drive Time** | `walk-vs-drive` | travel | Footprints | "Compare walk/drive time."
in: `distanceKm:number=3`, `walkKmh:number=5`, `driveKmh:number=30`
out: `walkMin:number`, `driveMin:number`, `verdict:text[primary,big]`
f: `d/v · 60`

**454. Naismith Hike Time** | `naismith-rule` | travel | Mountain | "Hike time via Naismith's rule."
in: `distanceKm:number=10`, `ascentM:number=300`
out: `hours:number[primary,big]`
f: `d/5 + ascent/600`

**455. Flight Carbon Emissions** | `flight-co2` | travel | Plane | "CO₂ per passenger."
in: `distanceKm:number=2000`, `class:select=economy`
out: `kgCO2:number[primary,big]`
f: per-km factor × class multiplier

**456. Travel Pace** | `travel-pace` | travel | Map | "Attractions per day."
in: `attractions:number=10`, `availableDays:number=5`
out: `perDay:number[primary,big]`
f: `attractions/days`

**457. Per Diem** | `per-diem` | travel | Wallet | "Daily allowance."
in: `tier:select=tier1`, `days:number=5`
out: `total:currency-inr[primary,big]`
f: tier rate × days

**458. Layover Buffer** | `layover-buffer` | travel | Plane | "Min connection time."
in: `intl:toggle=true`, `terminalChange:toggle=true`
out: `minMin:integer[primary,big]`
f: 60–180 min based on rules

**459. Train Ticket Total** | `train-ticket-total` | travel | Train | "Total ticket cost."
in: `baseFare:currency=800`, `reservation:currency=40`, `gst:percent=5`, `tatkalPct:percent=30`
out: `total:currency-inr[primary,big]`
f: base + reservation + tatkal + GST

**460. Great-Circle Distance** | `great-circle-distance` | travel | Globe | "Haversine distance."
in: `lat1:number=12.97`, `lon1:number=77.59`, `lat2:number=28.61`, `lon2:number=77.21`
out: `km:number[primary,big]`
f: Haversine formula

---

# J. Hotel / Hospitality (10)

**461. ADR** | `adr` | hospitality | Hotel | "Average daily rate."
in: `roomRevenue:currency=2000000`, `roomsSold:number=400`
out: `adr:currency-inr[primary,big]`
f: `revenue/rooms`

**462. RevPAR** | `revpar` | hospitality | Hotel | "Revenue per available room."
in: `roomRevenue:currency=2000000`, `roomsAvailable:number=600`
out: `revpar:currency-inr[primary,big]`
f: `revenue/available`

**463. Occupancy Rate** | `occupancy-rate` | hospitality | Hotel | "Sold/available."
in: `roomsSold:number=400`, `roomsAvailable:number=600`
out: `occupancy:percent[primary,big]`
f: `sold/available · 100`

**464. GOPPAR** | `goppar` | hospitality | Hotel | "GOP per available room."
in: `gop:currency=1500000`, `roomsAvailable:number=600`
out: `goppar:currency-inr[primary,big]`
f: `GOP/available`

**465. Restaurant Cover Count** | `restaurant-covers` | hospitality | Utensils | "Daily diner count."
in: `seats:number=50`, `turnsPerDay:number=3`
out: `covers:integer[primary,big]`
f: `seats · turns`

**466. Food Cost %** | `food-cost-percent` | hospitality | Utensils | "Cost / revenue."
in: `foodCost:currency=300000`, `foodRevenue:currency=900000`
out: `pct:percent[primary,big]`
f: `cost/revenue · 100`

**467. Beverage Pour Cost** | `pour-cost` | hospitality | Wine | "Pour cost %."
in: `bottleCost:currency=1500`, `oz:number=25.4`, `pourOz:number=1.5`, `pricePerPour:currency=400`
out: `pourCostPct:percent[primary,big]`
f: `(cost·pour/oz)/price · 100`

**468. Banquet BEO Cost** | `banquet-cost` | hospitality | Calendar | "Total banquet event cost."
in: `guests:number=200`, `perHead:currency=2500`, `serviceFeePct:percent=10`, `gst:percent=18`
out: `total:currency-inr[primary,big]`
f: `guests·head·(1+sc%+gst%)`

**469. Hotel Tax Total** | `hotel-tax` | hospitality | Receipt | "Taxes on stay."
in: `roomRate:currency=8000`, `gst:percent=18`, `cityTax:currency=200`, `nights:number=3`
out: `tax:currency-inr[primary,big]`
f: `(rate·gst% + cityTax)·nights`

**470. Hotel Profit Margin** | `hotel-profit-margin` | hospitality | Percent | "Profit / revenue."
in: `revenue:currency=10000000`, `cost:currency=7500000`
out: `margin:percent[primary,big]`
f: `(R−C)/R · 100`

---

# K. Legal & Contracts (15)

**471. Notice Period Pro-rata** | `notice-period-prorata` | legal | FileText | "Pay-in-lieu calc."
in: `daysShort:number=15`, `monthlySalary:currency=100000`
out: `recovery:currency-inr[primary,big]`
f: `(salary/30)·days`

**472. Severance Pay** | `severance-pay` | legal | FileText | "Indicative severance."
in: `monthlySalary:currency=100000`, `years:number=5`, `weeksPerYear:number=2`
out: `severance:currency-inr[primary,big]`
f: `(salary/30)·7·weeks·years`

**473. Contract Penalty Clause** | `contract-penalty` | legal | AlertTriangle | "Liquidated damages."
in: `contractValue:currency=1000000`, `delayDays:number=10`, `penaltyPctPerDay:percent=0.5`
out: `penalty:currency-inr[primary,big]`
f: `value · delay · rate%`

**474. NDA Expiry** | `nda-expiry` | legal | Calendar | "Date NDA obligations end."
in: `effectiveDate:date`, `years:number=3`
out: `expiryDate:date[primary,big]`
f: `effective + years`

**475. Court Fee (India)** | `court-fee-india` | legal | FileText | "Civil suit court fee."
in: `claimAmount:currency=500000`, `state:select=maharashtra`
out: `fee:currency-inr[primary,big]`
f: state slab

**476. Stamp Duty (Agreement)** | `stamp-duty-agreement` | legal | FileText | "Stamp duty on agreement."
in: `value:currency=1000000`, `state:select=maharashtra`, `type:select=rent`
out: `duty:currency-inr[primary,big]`
f: state-specific

**477. Probate Fee** | `probate-fee` | legal | FileText | "Probate court fee."
in: `estateValue:currency=5000000`, `state:select=maharashtra`
out: `fee:currency-inr[primary,big]`
f: state probate slabs

**478. Will Witness Count** | `will-witnesses` | legal | Users | "Required witnesses."
in: `country:select=india`
out: `witnesses:integer[primary,big]`
f: per-jurisdiction rule

**479. Lease Total Rent** | `lease-total-rent` | legal | Home | "Total rent w/ escalation."
in: `monthlyRent:currency=30000`, `years:number=3`, `escalationPct:percent=8`
out: `total:currency-inr[primary,big]`
f: geometric series

**480. Service Tax Late Fee** | `service-late-fee` | legal | AlertTriangle | "Penalty + interest."
in: `tax:currency=100000`, `daysLate:number=30`, `interestPctPerYear:percent=18`
out: `total:currency-inr[primary,big]`
f: `tax·interest·days/365 + penalty`

**481. Patent Renewal Fee** | `patent-renewal` | legal | Award | "Annual renewal."
in: `year:number=10`, `entity:select=large`
out: `fee:currency-inr[primary,big]`
f: IP-Office schedule

**482. Trademark Filing Fee** | `trademark-fee` | legal | Award | "Trademark filing fee."
in: `classes:number=2`, `entity:select=startup`
out: `total:currency-inr[primary,big]`
f: per-class × entity multiplier

**483. Royalty Income** | `royalty-income` | legal | DollarSign | "Royalty earned."
in: `salesRevenue:currency=10000000`, `rate:percent=8`
out: `royalty:currency-inr[primary,big]`
f: `revenue · rate%`

**484. Court Hearing Pace** | `court-hearing-pace` | legal | Gavel | "Months to dispose backlog."
in: `pendingCases:number=120`, `disposalsPerMonth:number=15`
out: `months:number[primary,big]`
f: `pending/disposals`

**485. Settlement vs Trial NPV** | `settlement-vs-trial` | legal | Scale | "Compare settlement vs trial EV."
in: `settlement:currency=200000`, `expectedTrial:currency=500000`, `pWin:percent=40`, `costs:currency=80000`
out: `evTrial:currency-inr[primary,big]`, `recommendation:text`
f: `pWin·expected − (1−pWin)·costs`

---

# L. Education & Academia (20)

**486. CGPA → Grade Letter** | `cgpa-grade` | education | GraduationCap | "Map CGPA to letter."
in: `cgpa:number=8.5`
out: `grade:text[primary,big]`
f: standard scale 10/9/8/...

**487. Weighted GPA** | `weighted-gpa` | education | GraduationCap | "GPA with weights."
in: `courses:textarea`
out: `gpa:number[primary,big]`
f: `Σ(grade·credits)/Σcredits`

**488. SAT Score** | `sat-score` | education | GraduationCap | "Composite SAT score."
in: `rawMath:number=750`, `rawEvidence:number=720`
out: `composite:integer[primary,big]`
f: section scaling sum

**489. ACT Composite** | `act-composite` | education | GraduationCap | "Avg of 4 subjects."
in: `eng:number=28`, `math:number=30`, `read:number=27`, `sci:number=29`
out: `composite:integer[primary,big]`
f: `round(avg)`

**490. JEE Percentile** | `jee-percentile` | education | GraduationCap | "Percentile from rank."
in: `rank:number=15000`, `totalCandidates:number=1000000`
out: `percentile:number[primary,big]`
f: `(total − rank)/total · 100`

**491. NEET Score → Rank** | `neet-rank` | education | GraduationCap | "Rank from raw score."
in: `score:number=650`
out: `rank:integer[primary,big]`
f: regression on historical curves

**492. CAT Percentile** | `cat-percentile` | education | GraduationCap | "Approx from raw score."
in: `score:number=70`, `peakScore:number=100`
out: `percentile:number[primary,big]`
f: empirical curve

**493. UGC NET Score** | `ugc-net-score` | education | GraduationCap | "Total weighted score."
in: `paper1:number=70`, `paper2:number=130`
out: `total:integer[primary,big]`
f: `p1 + p2`

**494. Class Average** | `class-average` | education | GraduationCap | "Mean of class marks."
in: `marks:textarea`
out: `avg:number[primary,big]`, `topQuartile:number`
f: `Σmarks/n`

**495. Pass Mark Predictor** | `pass-mark-predictor` | education | GraduationCap | "Marks needed to pass."
in: `currentMarks:number=240`, `pendingTests:number=2`, `passPct:percent=40`, `maxPerTest:number=100`
out: `needed:integer[primary,big]`
f: `(target − current)/pending`

**496. Attendance % Needed** | `attendance-needed` | education | GraduationCap | "Min future classes."
in: `attendedSoFar:number=40`, `totalSoFar:number=50`, `remainingClasses:number=30`, `requiredPct:percent=75`
out: `mustAttend:integer[primary,big]`
f: solve `(a+x)/(t+r) ≥ pct%`

**497. CGPA From Subjects** | `cgpa-from-subjects` | education | GraduationCap | "CGPA = Σ(grade·credit)/Σcredit."
in: `subjects:textarea`
out: `cgpa:number[primary,big]`
f: weighted average

**498. SGPA → CGPA** | `sgpa-to-cgpa` | education | GraduationCap | "CGPA across semesters."
in: `sgpas:textarea`
out: `cgpa:number[primary,big]`
f: simple or credit-weighted avg

**499. School Fees Total** | `school-fees-total` | education | School | "Annual school fees."
in: `tuition:currency=80000`, `activity:currency=10000`, `transport:currency=15000`, `misc:currency=5000`
out: `total:currency-inr[primary,big]`
f: sum

**500. Tutor Pay** | `tutor-pay` | education | GraduationCap | "Monthly tutor pay."
in: `hourlyRate:currency=500`, `hoursPerWeek:number=6`, `weeks:number=4`
out: `monthly:currency-inr[primary,big]`
f: `rate·hrs·weeks`

**501. Reading Speed (WPM)** | `reading-speed` | education | BookOpen | "Words per minute."
in: `words:number=600`, `minutes:number=3`
out: `wpm:integer[primary,big]`
f: `words/min`

**502. Time to Read** | `time-to-read` | education | BookOpen | "Minutes to read text."
in: `wordCount:number=5000`, `wpm:number=250`
out: `minutes:number[primary,big]`
f: `words/wpm`

**503. Course Completion ETA** | `course-eta` | education | Clock | "Hours to complete."
in: `totalLessons:number=80`, `done:number=20`, `hoursPerLesson:number=0.5`
out: `hours:number[primary,big]`
f: `(total − done) · hours`

**504. Spaced Repetition (SM-2)** | `spaced-rep` | education | RotateCw | "Next review interval."
in: `lastIntervalDays:number=4`, `easinessFactor:number=2.5`
out: `nextIntervalDays:number[primary,big]`
f: SM-2 algorithm

**505. Bibliography Page Count** | `bibliography-pages` | education | BookOpen | "Pages for citations."
in: `citations:number=50`, `perPage:number=8`
out: `pages:integer[primary,big]`
f: `⌈cites/perPage⌉`

---

# M. Sports — Extended (25)

**506. Marathon Pace** | `marathon-pace` | sports | Activity | "Pace for marathon."
in: `targetHours:number=4`, `targetMin:number=0`
out: `paceMinPerKm:text[primary,big]`
f: `(h·60+m)/42.195`

**507. Boston Marathon Qualifier** | `bq-time` | sports | Activity | "BQ time for age/sex."
in: `age:number=30`, `sex:select=male`
out: `time:text[primary,big]`
f: BAA cutoff table

**508. Wilks Score** | `wilks-score` | sports | Dumbbell | "Powerlifting Wilks."
in: `totalKg:number=500`, `bodyKg:number=80`, `sex:select=male`
out: `wilks:number[primary,big]`
f: Wilks coefficient × total

**509. Sinclair Score** | `sinclair-score` | sports | Dumbbell | "Olympic-lifting Sinclair."
in: `totalKg:number=300`, `bodyKg:number=85`, `sex:select=male`
out: `sinclair:number[primary,big]`
f: Sinclair coefficients

**510. FTP (Cycling)** | `ftp` | sports | Bike | "Functional threshold power."
in: `twentyMinAvgW:number=280`
out: `ftp:integer[primary,big]`
f: `0.95 · 20-min power`

**511. Cycling Power Zones** | `cycling-power-zones` | sports | Bike | "Zones from FTP."
in: `ftp:number=270`
out: `zone1:text`, `zone2:text`, `zone3:text[primary,big]`, `zone4:text`, `zone5:text`
f: Coggan zone ranges

**512. Running HR Zones** | `hr-zones` | sports | Heart | "5 HR zones from max."
in: `maxHr:number=190`
out: `zone1:text`, `zone2:text`, `zone3:text[primary,big]`, `zone4:text`, `zone5:text`
f: 50/60/70/80/90% of max

**513. Soccer Goal Differential** | `soccer-gd` | sports | CircleDot | "Net goals."
in: `goalsFor:number=24`, `goalsAgainst:number=15`
out: `gd:integer[primary,big]`
f: `for − against`

**514. NBA EFF Rating** | `nba-eff` | sports | Basketball | "Simple efficiency."
in: `pts:number=22`, `reb:number=8`, `ast:number=6`, `stl:number=2`, `blk:number=1`, `tov:number=3`, `fgMiss:number=8`, `ftMiss:number=2`
out: `eff:integer[primary,big]`
f: `pts+reb+ast+stl+blk − (tov+fgMiss+ftMiss)`

**515. Tennis Match Probability** | `tennis-match-prob` | sports | CircleDot | "Match prob from set prob."
in: `pSet:number=0.6`, `bestOf:select=3`
out: `pMatch:percent[primary,big]`
f: best-of-n closed form

**516. Boxing Punch Force** | `boxing-power` | sports | Hand | "Force from mass × velocity."
in: `bodyKg:number=80`, `armPctMass:number=5`, `velocityMs:number=8`
out: `force:number[primary,big]`
f: `m·v · 1000`

**517. F1 Lap Delta** | `f1-lap-delta` | sports | Car | "Time delta per lap."
in: `targetLapSec:number=80`, `actualLapSec:number=81.2`
out: `deltaSec:number[primary,big]`
f: `actual − target`

**518. Surfing Wave Energy** | `wave-energy` | sports | Waves | "Energy of an ocean wave."
in: `heightM:number=2`, `periodSec:number=8`
out: `kwPerM:number[primary,big]`
f: `0.5·H²·T`

**519. Swimming Pace** | `swim-pace` | sports | Waves | "Pace per 100m."
in: `distanceM:number=1500`, `timeMin:number=25`
out: `pacePer100:text[primary,big]`
f: `time/(distance/100)`

**520. Climbing Grade Convert** | `climbing-grade` | sports | Mountain | "YDS ↔ French ↔ UIAA."
in: `grade:text=5.11a`, `to:select=french`
out: `converted:text[primary,big]`
f: lookup table

**521. Padel DUPR Rating** | `padel-dupr` | sports | CircleDot | "DUPR rating change."
in: `currentRating:number=4`, `opponentRating:number=4.2`, `result:select=win`
out: `newRating:number[primary,big]`
f: rating delta by margin

**522. Snooker Snookers Needed** | `snooker-score` | sports | CircleDot | "Required snookers to win."
in: `behind:number=40`, `remaining:number=27`
out: `snookersNeeded:integer[primary,big]`
f: 4-point snooker math

**523. Cricket NRR** | `cricket-nrr` | sports | CircleDot | "Team net run rate."
in: `runsFor:number=1200`, `oversBatted:number=200`, `runsAgainst:number=1100`, `oversBowled:number=200`
out: `nrr:number[primary,big]`
f: `(RF/OF) − (RA/OA)`

**524. Hockey ELO** | `hockey-elo` | sports | CircleDot | "ELO update after match."
in: `ratingA:number=1500`, `ratingB:number=1500`, `result:select=win`, `k:number=20`
out: `newRatingA:number[primary,big]`
f: standard ELO

**525. Pole Vault Approx Height** | `pole-vault` | sports | Activity | "Approx height from speed."
in: `runSpeed:number=9.5`, `transferEff:percent=80`
out: `heightM:number[primary,big]`
f: `v²/(2g) · eff`

**526. Golf Stableford** | `golf-stableford` | sports | CircleDot | "Stableford points."
in: `parScores:textarea`
out: `points:integer[primary,big]`
f: per-hole Stableford table

**527. Bowling Average** | `bowling-average` | sports | CircleDot | "Bowling average."
in: `gamesScores:textarea`
out: `avg:number[primary,big]`
f: `Σ scores/games`

**528. Chess ELO Change** | `chess-elo-change` | sports | Award | "ELO change after game."
in: `ratingA:number=1500`, `ratingB:number=1600`, `result:select=win`, `k:number=20`
out: `delta:number[primary,big]`
f: `K(S − E)`

**529. Esports KDA** | `esports-kda` | gaming | Sword | "Kills+Assists / Deaths."
in: `kills:number=12`, `deaths:number=5`, `assists:number=8`
out: `kda:number[primary,big]`
f: `(K+A)/D`

**530. Race Time Predictor (VDOT)** | `race-time-daniels` | sports | Activity | "Predict race time across distances."
in: `knownTimeMin:number=22`, `knownKm:number=5`, `targetKm:number=10`
out: `predictedMin:number[primary,big]`
f: VDOT-style scaling

---

# N. Gaming (15)

**531. XP to Next Level** | `xp-to-next-level` | gaming | Sword | "XP needed."
in: `currentXp:number=1200`, `nextLevelXp:number=2500`
out: `needed:integer[primary,big]`
f: `next − current`

**532. Drop-Rate Trials** | `drop-rate-trials` | gaming | Sword | "Trials for ≥ 1 drop."
in: `dropPct:percent=2`, `desiredProb:percent=90`
out: `trials:integer[primary,big]`
f: `log(1−target)/log(1−p)`

**533. Win Rate** | `gaming-winrate` | gaming | Sword | "Win percentage."
in: `wins:number=120`, `total:number=200`
out: `winrate:percent[primary,big]`
f: `wins/total · 100`

**534. MMR Change** | `mmr-change` | gaming | Sword | "ELO-style MMR delta."
in: `playerMmr:number=1500`, `enemyMmr:number=1600`, `result:select=win`, `k:number=25`
out: `delta:number[primary,big]`
f: `K(S − E)`

**535. DPS** | `dps` | gaming | Sword | "Sustained DPS w/ crit."
in: `damagePerHit:number=200`, `hitsPerSec:number=2`, `critPct:percent=20`, `critMultiplier:number=2`
out: `dps:number[primary,big]`
f: `hits·dmg·(1 + crit%·(mult−1))`

**536. Effective HP** | `effective-hp` | gaming | Shield | "HP after armor."
in: `hp:number=1000`, `armor:number=200`
out: `ehp:number[primary,big]`
f: `HP·(1 + armor/100)`

**537. Loot-Box Pity** | `pity-system` | gaming | Gift | "Pulls until pity."
in: `currentPity:number=20`, `pityLimit:number=90`
out: `remaining:integer[primary,big]`
f: `limit − current`

**538. Grind Time** | `grind-time` | gaming | Clock | "Hours to farm goal."
in: `targetItems:number=100`, `dropPct:percent=5`, `runMinutes:number=10`
out: `hours:number[primary,big]`
f: `(target/p) · run/60`

**539. Crit Build EV** | `crit-build-ev` | gaming | Sword | "Expected damage w/ crits."
in: `baseDamage:number=100`, `critPct:percent=30`, `critMultiplier:number=2`
out: `ev:number[primary,big]`
f: `dmg(1 + crit%·(mult−1))`

**540. Mana / Stamina Regen** | `mana-regen` | gaming | Battery | "Time to full pool."
in: `current:number=100`, `max:number=500`, `regenPerSec:number=10`
out: `seconds:number[primary,big]`
f: `(max−cur)/regen`

**541. Mouse Sensitivity Convert** | `sensitivity-conversion` | gaming | MousePointer | "Sens between games."
in: `sourceSens:number=2`, `sourceFactor:number=0.022`, `targetFactor:number=0.022`
out: `targetSens:number[primary,big]`
f: `source · sourceFactor/targetFactor`

**542. Monitor Hz Frame-time** | `monitor-hz` | gaming | Monitor | "Frame time at refresh."
in: `hz:number=144`
out: `frameMs:number[primary,big]`
f: `1000/hz`

**543. PC Build Wattage** | `pc-wattage` | gaming | Cpu | "PSU sizing."
in: `cpuW:number=125`, `gpuW:number=350`, `otherW:number=80`, `headroomPct:percent=20`
out: `psuW:integer[primary,big]`
f: `(cpu+gpu+other)·(1+headroom)`

**544. Frame-Time → FPS** | `rtx-frametime` | gaming | Cpu | "FPS from frame time."
in: `avgMs:number=8`
out: `fps:number[primary,big]`
f: `1000/ms`

**545. Steam Refund Eligible** | `steam-refund` | gaming | RefreshCw | "Refund eligibility check."
in: `hoursPlayed:number=1.5`, `daysSincePurchase:number=10`
out: `verdict:text[primary,big]`
f: `hours ≤ 2 AND days ≤ 14`

---

# O. Hobbies (DIY / 3D Printing / Sewing) (25)

**546. 3D Print Time** | `3d-print-time` | hobbies | Printer | "Estimate print time."
in: `volumeMm3:number=20000`, `flowRateMm3Sec:number=8`, `infillPct:percent=20`
out: `hours:number[primary,big]`
f: `vol·infill/flow/3600`

**547. Filament Length** | `filament-required` | hobbies | Printer | "Filament length for model."
in: `volumeMm3:number=20000`, `filamentDiaMm:number=1.75`
out: `meters:number[primary,big]`
f: `vol/(π·(d/2)²·1000)`

**548. Filament Cost** | `filament-cost` | hobbies | Coins | "Cost of one print."
in: `gramsUsed:number=80`, `pricePerKg:currency=1500`
out: `cost:currency-inr[primary,big]`
f: `grams · price/1000`

**549. Layer Height vs Time** | `layer-height-time` | hobbies | Printer | "Time tradeoff."
in: `currentLh:number=0.2`, `newLh:number=0.16`, `baseHours:number=5`
out: `newHours:number[primary,big]`
f: `base · current/new`

**550. Resin Print Volume** | `resin-print-volume` | hobbies | Beaker | "Resin needed (mL)."
in: `volumeMm3:number=15000`, `density:number=1.1`
out: `ml:number[primary,big]`
f: `vol/1000`

**551. CNC Feed Rate** | `cnc-feed-rate` | hobbies | Wrench | "Feed from RPM + chip load."
in: `rpm:number=12000`, `flutes:number=2`, `chipLoad:number=0.05`
out: `feedMmMin:number[primary,big]`
f: `RPM · flutes · chip`

**552. Wood Board Feet** | `board-feet` | hobbies | Trees | "Board-feet."
in: `qty:number=4`, `thicknessIn:number=1`, `widthIn:number=6`, `lengthFt:number=8`
out: `bf:number[primary,big]`
f: `qty·t·w·L/12`

**553. Plywood Sheets** | `plywood-sheets` | hobbies | Layers | "Sheets for area."
in: `areaSqFt:number=80`, `sheetSqFt:number=32`, `waste:percent=10`
out: `sheets:integer[primary,big]`
f: `⌈area·(1+waste)/sheet⌉`

**554. Paint Buckets** | `paint-buckets` | hobbies | Paintbrush | "Buckets for room."
in: `wallArea:number=80`, `coverageM2:number=12`, `coats:number=2`, `bucketL:number=4`, `coverageL:number=10`
out: `buckets:integer[primary,big]`
f: `⌈area·coats/(bucket·coverage)⌉`

**555. Sewing Fabric Length** | `sewing-fabric` | hobbies | Scissors | "Meters of fabric needed."
in: `patternM:number=2.3`, `extraPct:percent=15`
out: `meters:number[primary,big]`
f: `pattern·(1+extra)`

**556. Yarn Required** | `yarn-required` | hobbies | Scissors | "Skeins for garment."
in: `stitches:number=20000`, `yardsPerStitch:number=0.03`, `skeinYards:number=200`
out: `skeins:integer[primary,big]`
f: `⌈stitches·yps/skein⌉`

**557. Embroidery Stitches** | `embroidery-stitches` | hobbies | Scissors | "Stitch count for area."
in: `areaCm2:number=50`, `stitchesPerCm2:number=300`
out: `stitches:integer[primary,big]`
f: `area · density`

**558. Pottery Clay Weight** | `pottery-clay` | hobbies | Beaker | "Clay for vessel."
in: `heightCm:number=15`, `dia:number=10`, `wallMm:number=8`, `density:number=2`
out: `grams:number[primary,big]`
f: hollow cylinder × density

**559. Bicycle Gear Inches** | `bike-gear-inches` | hobbies | Bike | "Gear inches."
in: `chainring:number=50`, `cog:number=15`, `wheelDiaIn:number=27`
out: `gearInches:number[primary,big]`
f: `(chain/cog)·dia`

**560. Bike Spoke Length** | `bike-spoke-length` | hobbies | Bike | "Spoke length."
in: `erd:number=600`, `flangeDia:number=44`, `offset:number=35`, `crossings:number=3`
out: `lengthMm:number[primary,big]`
f: standard spoke formula

**561. Tripod Height** | `tripod-height` | hobbies | Camera | "Height for eye-level."
in: `eyeHeightCm:number=160`, `cameraHeightCm:number=12`
out: `tripodCm:number[primary,big]`
f: `eye − cam`

**562. Photo Frame Mat Size** | `mat-size` | hobbies | Image | "Outer frame size."
in: `photoWidthIn:number=8`, `photoHeightIn:number=10`, `matIn:number=2`
out: `frameWidthIn:number[primary,big]`, `frameHeightIn:number`
f: `photo + 2·mat`

**563. Birdhouse Timber** | `birdhouse-timber` | hobbies | Bird | "Square cm of wood."
in: `style:select=standard`
out: `cm2:integer[primary,big]`
f: per-style cut list

**564. Candle Wax Weight** | `candle-wax` | hobbies | Flame | "Wax grams for jar."
in: `jarMl:number=200`, `waxDensity:number=0.9`
out: `grams:integer[primary,big]`
f: `volume · density`

**565. Soap Lye Required** | `soap-lye` | hobbies | Beaker | "Lye for oils."
in: `oilsG:number=500`, `saponificationValue:number=0.135`
out: `lyeG:number[primary,big]`
f: `oils · SAP value`

**566. Brewing IBU** | `brewing-ibu` | hobbies | Beer | "Estimated IBU."
in: `hopOz:number=1`, `alphaPct:percent=5`, `timeMin:number=60`, `wortGallons:number=5`
out: `ibu:number[primary,big]`
f: Rager/Tinseth approx

**567. Beer ABV (precise)** | `beer-abv-detailed` | hobbies | Beer | "OG/FG to ABV."
in: `og:number=1.06`, `fg:number=1.012`
out: `abv:percent[primary,big]`
f: `(76.08·(og−fg)/(1.775−og)) · fg/0.794`

**568. Wine Sulfite Addition** | `wine-sulfite` | hobbies | Wine | "Mg KMS for batch."
in: `liters:number=20`, `targetPpm:number=50`
out: `mg:number[primary,big]`
f: `L · ppm · 0.57`

**569. Coffee Brew Temp** | `coffee-brew-temp` | hobbies | Coffee | "Recommended water temp."
in: `method:select=pourOver`
out: `tempC:integer[primary,big]`
f: method table (88–96°C)

**570. Astrophotography Stack** | `astro-stack` | hobbies | Star | "Subs for target SNR."
in: `subExposureSec:number=120`, `targetTotalMin:number=120`
out: `subs:integer[primary,big]`
f: `target·60/sub`

---

# P. Fashion & Beauty (15)

**571. Shoe Size Convert** | `shoe-size-convert` | fashion | Footprints | "US/UK/EU/JP shoe sizes."
in: `value:number=9`, `from:select=us-men`, `to:select=eu`
out: `result:number[primary,big]`
f: standard table

**572. Ring Size Convert** | `ring-size-convert` | fashion | CircleDot | "US/UK/EU/JP ring sizes."
in: `value:number=7`, `from:select=us`, `to:select=uk`
out: `result:text[primary,big]`
f: standard table

**573. Bra Size Convert** | `bra-size-convert` | fashion | Shirt | "Cross-country bra sizing."
in: `band:number=34`, `cup:text=C`, `to:select=uk`
out: `result:text[primary,big]`
f: regional sizing table

**574. Fabric Yardage** | `fabric-yardage` | fashion | Scissors | "Yards from pattern."
in: `patternYards:number=2.5`, `extraPct:percent=10`
out: `yards:number[primary,big]`
f: `pattern·(1+extra)`

**575. Belt Size** | `belt-size` | fashion | Footprints | "Waist → belt size."
in: `waistIn:number=32`
out: `belt:integer[primary,big]`
f: `waist + 2`

**576. Waist-to-Hip Ratio** | `whr` | fashion | User | "WHR."
in: `waist:number=80`, `hip:number=100`
out: `whr:number[primary,big]`, `category:text`
f: `waist/hip`

**577. Body Shape Classification** | `body-shape` | fashion | User | "Determine body shape."
in: `bust:number=90`, `waist:number=70`, `hip:number=95`
out: `shape:text[primary,big]`
f: rule-based on ratios

**578. Hair Bleach Quantity** | `hair-bleach` | fashion | Scissors | "Volume per length."
in: `hairLengthCm:number=40`, `density:select=medium`
out: `grams:integer[primary,big]`
f: per-length table

**579. Skincare Routine Cost** | `skincare-routine` | fashion | Sparkles | "Monthly routine cost."
in: `products:textarea`
out: `monthly:currency-inr[primary,big]`
f: per-product cost÷months-of-use

**580. Sunscreen Quantity** | `sunscreen-quantity` | fashion | Sun | "Grams for full body."
in: `surfaceArea:number=1.7`, `spfFactorMgPerCm2:number=2`
out: `grams:integer[primary,big]`
f: `area · 100·factor`

**581. Foundation Shade Match** | `foundation-shade` | fashion | Palette | "Undertone band."
in: `undertone:select=warm`, `skinTone:select=medium`
out: `shade:text[primary,big]`
f: matrix lookup

**582. Hair Dye Mixing** | `hair-dye-mix` | fashion | Beaker | "Dye + developer ratio."
in: `dyeMl:number=60`, `ratio:select=1:1`
out: `developerMl:integer[primary,big]`
f: ratio multiplier

**583. Watch Strap Sizing** | `watch-strap` | fashion | Watch | "Strap length for wrist."
in: `wristCm:number=18`
out: `strapMm:integer[primary,big]`
f: `wrist + 1 cm slack`

**584. Necklace Length** | `necklace-length` | fashion | Gem | "Necklace falls where."
in: `lengthIn:number=18`
out: `placement:text[primary,big]`
f: choker / princess / matinee tiers

**585. Suit Size Convert** | `suit-size-convert` | fashion | Shirt | "Chest → suit number."
in: `chestCm:number=100`, `region:select=us`
out: `suitSize:integer[primary,big]`
f: `chestCm/2.54 → US size`

---

# Q. Career / HR (15)

**586. Hike % Needed** | `hike-needed` | career | TrendingUp | "Hike to reach target."
in: `currentCtc:currency=1500000`, `targetCtc:currency=2000000`
out: `hikePct:percent[primary,big]`
f: `(target − current)/current · 100`

**587. Salary Equivalent (City)** | `salary-equivalent-city` | career | Map | "Lifestyle-adjusted salary."
in: `salary:currency=1500000`, `fromCity:select=bangalore`, `toCity:select=delhi`
out: `equivalent:currency-inr[primary,big]`
f: COL index × salary

**588. Notice Buyout** | `notice-buyout` | career | FileText | "Buyout cost."
in: `monthlySalary:currency=100000`, `daysToBuy:number=30`
out: `buyout:currency-inr[primary,big]`
f: `(salary/30)·days`

**589. ESOP Vesting** | `esop-vesting` | career | Award | "Vested shares to date."
in: `totalShares:number=10000`, `cliffMonths:number=12`, `totalMonths:number=48`, `monthsServed:number=24`
out: `vested:integer[primary,big]`
f: `total · monthsServed/totalMonths` (after cliff)

**590. Joining Bonus Net** | `joining-bonus-net` | career | Wallet | "Net joining bonus."
in: `gross:currency=500000`, `tax:percent=30`
out: `net:currency-inr[primary,big]`
f: `gross·(1−tax%)`

**591. Stock RSU Value** | `rsu-value` | career | Award | "Value of vested RSUs."
in: `units:number=400`, `pricePerUnit:currency=2500`, `vestedPct:percent=50`
out: `value:currency-inr[primary,big]`
f: `units·price·vested%`

**592. Cost to Company** | `cost-to-company` | career | Users | "Loaded employee cost."
in: `salary:currency=1500000`, `loadingPct:percent=30`
out: `ctc:currency-inr[primary,big]`
f: `salary · (1 + loading%)`

**593. Overtime Pay** | `overtime-pay` | career | Clock | "Overtime earnings."
in: `hourlyRate:currency=500`, `otHours:number=10`, `multiplier:number=1.5`
out: `otPay:currency-inr[primary,big]`
f: `rate · hrs · mult`

**594. Vacation Accrual** | `vacation-accrual` | career | Calendar | "Days accrued."
in: `daysPerYear:number=20`, `monthsServed:number=6`
out: `accruedDays:number[primary,big]`
f: `days · months/12`

**595. Leave Cash-out** | `leave-cashout` | career | Coins | "Cash-out value."
in: `salaryPerDay:currency=4000`, `unusedDays:number=10`
out: `cashout:currency-inr[primary,big]`
f: `salary · days`

**596. Pension Vesting** | `pension-vesting` | career | Shield | "Vested pension benefit."
in: `years:number=5`, `vestingTable:select=cliff5`
out: `vestedPct:percent[primary,big]`
f: cliff/graded schedule

**597. PIP Exit Probability** | `pip-exit-probability` | career | AlertTriangle | "Estimated PIP outcome."
in: `performanceRating:select=below`, `pipDurationWeeks:number=6`
out: `exitProb:percent[primary,big]`
f: empirical table

**598. Commute Cost** | `commute-cost` | career | Car | "Annual commute cost."
in: `kmPerDay:number=30`, `daysPerMonth:number=22`, `costPerKm:currency=12`
out: `annual:currency-inr[primary,big]`
f: `km · days · 12 · rate`

**599. Working Hours/Year** | `working-hours-year` | career | Clock | "Annual working hours."
in: `hoursPerWeek:number=45`, `weeks:number=48`
out: `hours:integer[primary,big]`
f: `hrs · weeks`

**600. Career Break Cost** | `career-break-cost` | career | TrendingDown | "Opportunity cost of a break."
in: `annualSalary:currency=1800000`, `breakMonths:number=12`, `salaryGrowth:percent=10`
out: `cost:currency-inr[primary,big]`
f: `annual · months/12 + lost growth`

---

## Index

| #         | Section                 | Count   |
| --------- | ----------------------- | ------- |
| A         | Biology & Medicine      | 30      |
| B         | Genetics                | 10      |
| C         | Astronomy & Space       | 20      |
| D         | Music & Audio           | 20      |
| E         | Photography             | 15      |
| F         | Cinema / Video          | 10      |
| G         | Gardening & Farming     | 20      |
| H         | Pets / Veterinary       | 15      |
| I         | Travel & Aviation       | 20      |
| J         | Hotel / Hospitality     | 10      |
| K         | Legal & Contracts       | 15      |
| L         | Education & Academia    | 20      |
| M         | Sports — Extended       | 25      |
| N         | Gaming                  | 15      |
| O         | Hobbies (DIY/3D/Sewing) | 25      |
| P         | Fashion & Beauty        | 15      |
| Q         | Career / HR             | 15      |
| **Total** |                         | **300** |

---

## How both batches connect

- **Batch 1** (`300-new-calculators.md`) → professional / quantitative: Investing, Insurance, Real Estate, Business, Marketing, Engineering, Statistics, CS, Networking, Crypto-sec, Data Science, DB.
- **Batch 2** (this file) → lifestyle / specialized verticals: Biology, Genetics, Astronomy, Music, Photography, Video, Gardening, Pets, Travel, Hospitality, Legal, Education, Sports-extended, Gaming, Hobbies, Fashion, Career.

Build both in priority order from the Batch 1 index, then expand into Batch 2 once new categories are added to `src/types/calculator.ts` and `src/constants/calculators.ts`.
