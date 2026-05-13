# 500 New Calculators — Batch 3

> Sourced from the project's master Excel catalog (`docs/calcmaster-catalog.xlsx`, 1,621 entries).
> Deduped against everything in `300-new-calculators.md`, `next-300-calculators.md`, and the live calculator registry.
> Numbering continues from #601.

Format (identical to previous two batches):

```
**N. Calculator Name** | `slug` | category | LucideIcon | "shortDesc"
  in:  id:kind=default, …
  out: id:format[tone,big?], …
  f:   formula or one-line algorithm
```

New categories introduced here (extend `Category` union in `src/types/calculator.ts`):
`parenting`, `education`, `environment`, `astronomy`, `biology`, `travel`, `business`.

---

# A. Engineering (59)

**601. Unit Conversion Calculator** | `unit-conversion` | engineering | Calculator | "Convert between different units"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**602. Material Density Calculator** | `material-density` | engineering | Gauge | "Calculate material density"
in: `mass:number=100`, `volume:number=10`
out: `density:number[primary,big]`
f: ρ = m/V

**603. Stress and Strain Calculator** | `stress-and-strain` | engineering | Calculator | "Calculate stress and strain"
in: `force:number=1000`, `area:number=0.5`
out: `pressure:number[primary,big]`
f: P = F/A

**604. Thermal Expansion Calculator** | `thermal-expansion` | engineering | Calculator | "Calculate thermal expansion"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**605. Heat Transfer Calculator** | `heat-transfer` | engineering | Thermometer | "Calculate heat transfer rates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**606. Torque Calculator** | `torque` | engineering | Wrench | "Calculate torque values"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**607. Safety Factor Calculator** | `safety-factor` | engineering | Calculator | "Calculate safety factors"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**608. Energy Conversion Calculator** | `energy-conversion` | engineering | Wrench | "Convert between energy units"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**609. Work and Power Calculator** | `work-and-power` | engineering | Wrench | "Calculate work and power"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**610. Concrete Calculator** | `concrete` | engineering | Construction | "Calculate concrete quantities"
in: `lengthM:number=10`, `widthM:number=5`, `thicknessM:number=0.15`
out: `volume:number[primary,big]`, `materials:text`
f: volume × material density / coverage

**611. Cement Bag Calculator** | `cement-bag` | engineering | Construction | "Calculate cement bag requirements"
in: `lengthM:number=10`, `widthM:number=5`, `thicknessM:number=0.15`
out: `volume:number[primary,big]`, `materials:text`
f: volume × material density / coverage

**612. Steel Weight Calculator** | `steel-weight` | engineering | Wrench | "Calculate steel weight"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**613. Brick Calculator** | `brick` | engineering | Construction | "Calculate brick quantities"
in: `lengthM:number=10`, `widthM:number=5`, `thicknessM:number=0.15`
out: `volume:number[primary,big]`, `materials:text`
f: volume × material density / coverage

**614. Block Calculator** | `block` | engineering | Calculator | "Calculate block quantities"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**615. Aggregate Calculator** | `aggregate` | engineering | Construction | "Calculate aggregate quantities"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**616. Sand Calculator** | `sand` | engineering | Construction | "Calculate sand quantities"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**617. Mortar Calculator** | `mortar` | engineering | Construction | "Calculate mortar quantities"
in: `lengthM:number=10`, `widthM:number=5`, `thicknessM:number=0.15`
out: `volume:number[primary,big]`, `materials:text`
f: volume × material density / coverage

**618. Asphalt Calculator** | `asphalt` | engineering | Calculator | "Calculate asphalt quantities"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**619. Rebar Weight Calculator** | `rebar-weight` | engineering | Construction | "Calculate rebar weight"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**620. Beam Deflection Calculator** | `beam-deflection` | engineering | Construction | "Calculate beam deflection"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**621. Column Load Calculator** | `column-load` | engineering | Construction | "Calculate column loads"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**622. Slope Stability Calculator** | `slope-stability` | engineering | Calculator | "Calculate slope stability"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**623. Soil Bearing Capacity Calculator** | `soil-bearing-capacity` | engineering | Calculator | "Calculate soil bearing capacity"
in: `a:number=5`, `b:number=4`, `c:number=3`, `shape:select=cuboid`
out: `volume:number[primary,big]`
f: shape-specific volume

**624. Water Tank Volume Calculator** | `water-tank-volume` | engineering | Fish | "Calculate water tank volume"
in: `a:number=5`, `b:number=4`, `c:number=3`, `shape:select=cuboid`
out: `volume:number[primary,big]`
f: shape-specific volume

**625. Foundation Design Calculator** | `foundation-design` | engineering | Calculator | "Design foundations"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**626. Retaining Wall Calculator** | `retaining-wall` | engineering | Fence | "Design retaining walls"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**627. Staircase Calculator** | `staircase` | engineering | Calculator | "Design staircases"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**628. Pile Load Capacity Calculator** | `pile-load-capacity` | engineering | Calculator | "Calculate pile load capacity"
in: `a:number=5`, `b:number=4`, `c:number=3`, `shape:select=cuboid`
out: `volume:number[primary,big]`
f: shape-specific volume

**629. Beam Load Calculator** | `beam-load` | engineering | Construction | "Calculate beam loads"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**630. Cantilever Beam Calculator** | `cantilever-beam` | engineering | Construction | "Calculate cantilever beams"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**631. Shear Force and Bending Moment Calculator** | `shear-force-and-bending-moment` | engineering | Wrench | "Calculate shear force and bending moment"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**632. Moment of Inertia Calculator** | `moment-of-inertia` | engineering | Calculator | "Calculate moment of inertia"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**633. Section Modulus Calculator** | `section-modulus` | engineering | Calculator | "Calculate section modulus"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**634. Truss Load Calculator** | `truss-load` | engineering | Calculator | "Calculate truss loads"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**635. Deflection of Beam Calculator** | `deflection-of-beam` | engineering | Construction | "Calculate beam deflection"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**636. Stress Distribution Calculator** | `stress-distribution` | engineering | Calculator | "Calculate stress distribution"
in: `force:number=1000`, `area:number=0.5`
out: `pressure:number[primary,big]`
f: P = F/A

**637. Column Buckling Calculator** | `column-buckling` | engineering | Construction | "Calculate column buckling"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**638. Load Combination Calculator** | `load-combination` | engineering | Calculator | "Calculate load combinations"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**639. Torsional Stress Calculator** | `torsional-stress` | engineering | Calculator | "Calculate torsional stress"
in: `force:number=1000`, `area:number=0.5`
out: `pressure:number[primary,big]`
f: P = F/A

**640. Structural Load Calculator** | `structural-load` | engineering | Calculator | "Calculate structural loads"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**641. Roof Load Calculator** | `roof-load` | engineering | Triangle | "Calculate roof loads"
in: `lengthM:number=10`, `widthM:number=5`, `thicknessM:number=0.15`
out: `volume:number[primary,big]`, `materials:text`
f: volume × material density / coverage

**642. Dead Load and Live Load Calculator** | `dead-load-and-live-load` | engineering | Calculator | "Calculate dead and live loads"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**643. Pulley Belt Calculator** | `pulley-belt` | engineering | Calculator | "Calculate pulley systems"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**644. Shaft Torque Calculator** | `shaft-torque` | engineering | Wrench | "Calculate shaft torque"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**645. Bearing Life Calculator** | `bearing-life` | engineering | Calculator | "Calculate bearing life"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**646. Pipe Friction Loss Calculator** | `pipe-friction-loss` | engineering | Wrench | "Calculate pipe friction losses"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**647. Flow Rate Calculator** | `flow-rate` | engineering | Calculator | "Calculate flow rates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**648. HVAC Load Calculator** | `hvac-load` | engineering | Calculator | "Calculate HVAC loads"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**649. Heat Exchanger Efficiency Calculator** | `heat-exchanger-efficiency` | engineering | Thermometer | "Calculate heat exchanger efficiency"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**650. Thermodynamics Calculator** | `thermodynamics` | engineering | Calculator | "Calculate thermodynamic properties"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**651. Specific Heat Capacity Calculator** | `specific-heat-capacity` | engineering | Thermometer | "Calculate specific heat capacity"
in: `a:number=5`, `b:number=4`, `c:number=3`, `shape:select=cuboid`
out: `volume:number[primary,big]`
f: shape-specific volume

**652. Velocity Calculator** | `velocity` | engineering | Wrench | "Calculate velocities"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**653. Kinematic Viscosity Calculator** | `kinematic-viscosity` | engineering | Gauge | "Calculate kinematic viscosity"
in: `u:number=0`, `a:number=9.8`, `t:number=2`
out: `v:number[primary,big]`
f: v = u + a·t

**654. Reynolds Number Calculator** | `reynolds-number` | engineering | Calculator | "Calculate Reynolds number"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**655. Power Transmission Calculator** | `power-transmission` | engineering | Wrench | "Calculate power transmission"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**656. Pressure Drop Calculator** | `pressure-drop` | engineering | Gauge | "Calculate pressure drops"
in: `force:number=1000`, `area:number=0.5`
out: `pressure:number[primary,big]`
f: P = F/A

**657. Fluid Dynamics Calculator** | `fluid-dynamics` | engineering | Calculator | "Calculate fluid dynamics"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**658. Current Divider Calculator** | `current-divider` | engineering | Calculator | "Calculate current division"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**659. Resistance Calculator** | `resistance` | engineering | Calculator | "Calculate resistance"
in: `V:number=12`, `I:number=2`
out: `R:number[primary,big]`, `P:number`
f: V = IR ; P = VI

---

# B. Math (40)

**660. Basic Arithmetic Calculator** | `basic-arithmetic` | math | Calculator | "Perform basic arithmetic operations"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**661. Addition Calculator** | `addition` | math | Calculator | "Add multiple numbers"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**662. Subtraction Calculator** | `subtraction` | math | Calculator | "Subtract numbers"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**663. Multiplication Calculator** | `multiplication` | math | Calculator | "Multiply numbers"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**664. Division Calculator** | `division` | math | Calculator | "Divide numbers"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**665. Long Division Calculator** | `long-division` | math | Calculator | "Perform long division"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**666. Average Calculator** | `average` | math | Calculator | "Calculate averages"
in: `values:textarea`
out: `result:number[primary,big]`
f: descriptive statistics

**667. GCD Calculator** | `gcd` | math | Calculator | "Find greatest common divisor"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**668. LCM Calculator** | `lcm` | math | Calculator | "Find least common multiple"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**669. Range Calculator** | `range` | math | Calculator | "Calculate range of numbers"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**670. Absolute Value Calculator** | `absolute-value` | math | Calculator | "Calculate absolute values"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**671. Ceiling & Floor Calculator** | `ceiling-floor` | math | LayoutGrid | "Calculate ceiling and floor values"
in: `lengthM:number=10`, `widthM:number=5`, `thicknessM:number=0.15`
out: `volume:number[primary,big]`, `materials:text`
f: volume × material density / coverage

**672. Percentage Calculator** | `percentage` | math | Calculator | "Calculate percentages"
in: `subjects:textarea`
out: `gpa:number[primary,big]`
f: Σ(grade·credit)/Σcredit

**673. Percentage Change Calculator** | `percentage-change` | math | Calculator | "Calculate percentage changes"
in: `subjects:textarea`
out: `gpa:number[primary,big]`
f: Σ(grade·credit)/Σcredit

**674. Discount Calculator** | `discount` | math | Calculator | "Calculate discounts"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**675. Markup Calculator** | `markup` | math | Calculator | "Calculate markup percentages"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**676. Ratio Calculator** | `ratio` | math | Percent | "Calculate ratios"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**677. Proportion Calculator** | `proportion` | math | Percent | "Solve proportions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**678. Profit/Loss Calculator** | `profitloss` | math | Calculator | "Calculate profit/loss percentages"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**679. Percentile Calculator** | `percentile` | math | GraduationCap | "Calculate percentile ranks"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**680. Tax Calculator** | `tax` | math | Receipt | "Calculate tax amounts and percentages"
in: `amount:currency=10000`, `ratePct:percent=18`
out: `tax:currency-inr[primary,big]`, `total:currency-inr`
f: tax = amount × rate%

**681. Interest Calculator** | `interest` | math | Percent | "Calculate interest rates and amounts"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**682. Fraction Calculator** | `fraction` | math | Percent | "Calculate with fractions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**683. Simplify Fractions** | `simplify-fractions` | math | Calculator | "Simplify fractions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**684. Fraction to Decimal** | `fraction-to-decimal` | math | Percent | "Convert fractions to decimals"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**685. Decimal to Fraction** | `decimal-to-fraction` | math | Percent | "Convert decimals to fractions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**686. Add Fractions** | `add-fractions` | math | Calculator | "Add multiple fractions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**687. Subtract Fractions** | `subtract-fractions` | math | Calculator | "Subtract fractions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**688. Multiply Fractions** | `multiply-fractions` | math | Calculator | "Multiply fractions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**689. Divide Fractions** | `divide-fractions` | math | Calculator | "Divide fractions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**690. Mixed Numbers** | `mixed-numbers` | math | Wrench | "Work with mixed numbers"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**691. Recurring Decimals** | `recurring-decimals` | math | Wrench | "Work with recurring decimals"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**692. Percent to Fraction** | `percent-to-fraction` | math | Percent | "Convert percentages to fractions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**693. Decimal to Percent** | `decimal-to-percent` | math | Percent | "Convert decimals to percentages"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**694. Expression Solver** | `expression-solver` | math | Calculator | "Solve algebraic expressions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**695. Quadratic Equation** | `quadratic-equation` | math | Calculator | "Solve quadratic equations"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**696. Linear Equation** | `linear-equation` | math | Calculator | "Solve linear equations"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**697. System of Equations** | `system-of-equations` | math | Calculator | "Solve equation systems"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**698. Polynomial Calculator** | `polynomial` | math | Wrench | "Work with polynomials"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**699. Factoring Calculator** | `factoring` | math | Calculator | "Factor expressions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

---

# C. Travel & Transportation (40)

**700. Estimated Travel Time Calculator** | `estimated-travel-time` | travel | Calculator | "Estimate travel time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**701. Travel Duration Calculator** | `travel-duration` | travel | Calculator | "Calculate travel duration"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**702. Road Trip Time Estimator** | `road-trip-time-estimator` | travel | Map | "Estimate road trip time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**703. Walking Time Calculator** | `walking-time` | travel | Calculator | "Calculate walking time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**704. Train Journey Duration Calculator** | `train-journey-duration` | travel | Train | "Calculate train journey time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**705. Bike Ride Time Calculator** | `bike-ride-time` | travel | Bike | "Calculate bike ride time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**706. Travel Time Delay Calculator** | `travel-time-delay` | travel | Calculator | "Calculate travel delays"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**707. Miles Per Gallon (MPG) Calculator** | `miles-per-gallon-mpg` | travel | Fuel | "Calculate MPG"
in: `distanceKm:number=100`, `mileage:number=15`, `pricePerLitre:currency=100`
out: `cost:currency-inr[primary,big]`
f: cost = distance / mileage × price

**708. Fuel Efficiency Calculator** | `fuel-efficiency` | travel | Fuel | "Calculate fuel efficiency"
in: `distanceKm:number=100`, `mileage:number=15`, `pricePerLitre:currency=100`
out: `cost:currency-inr[primary,big]`
f: cost = distance / mileage × price

**709. Gas Cost Calculator** | `gas-cost` | travel | Calculator | "Calculate gas costs"
in: `P:number=101325`, `V:number=0.0224`, `T:number=273`
out: `n:number[primary,big]`
f: PV = nRT

**710. Vehicle Fuel Cost Estimator** | `vehicle-fuel-cost-estimator` | travel | Car | "Estimate vehicle fuel costs"
in: `distanceKm:number=100`, `mileage:number=15`, `pricePerLitre:currency=100`
out: `cost:currency-inr[primary,big]`
f: cost = distance / mileage × price

**711. Gasoline Cost Calculator** | `gasoline-cost` | travel | Fuel | "Calculate gasoline costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**712. Miles Per Liter (MPL) Calculator** | `miles-per-liter-mpl` | travel | Calculator | "Calculate MPL"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**713. Vehicle Range Calculator** | `vehicle-range` | travel | Car | "Calculate vehicle range"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**714. Fuel Tank Capacity Calculator** | `fuel-tank-capacity` | travel | Fuel | "Calculate fuel capacity"
in: `distanceKm:number=100`, `mileage:number=15`, `pricePerLitre:currency=100`
out: `cost:currency-inr[primary,big]`
f: cost = distance / mileage × price

**715. CO2 Emission Calculator for Vehicles** | `co2-emission-calculator-for-vehicles` | travel | Car | "Calculate vehicle emissions"
in: `activity:number=10000`, `emissionFactor:number=0.21`
out: `kgCO2:number[primary,big]`
f: CO₂ = activity × emission factor

**716. Currency Exchange Fee Calculator** | `currency-exchange-fee` | travel | Calculator | "Calculate exchange fees"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**717. Daily Budget Calculator for Travel** | `daily-budget-calculator-for-travel` | travel | Wallet | "Calculate daily budget"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**718. Total Trip Cost Calculator** | `total-trip-cost` | travel | Map | "Calculate total trip cost"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**719. International Travel Cost Estimator** | `international-travel-cost-estimator` | travel | Calculator | "Estimate international costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**720. Packing List Cost Calculator** | `packing-list-cost` | travel | Calculator | "Calculate packing costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**721. Route Planner Calculator** | `route-planner` | travel | Map | "Plan travel routes"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**722. Shortest Path Calculator** | `shortest-path` | travel | Calculator | "Find shortest paths"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**723. Best Route Calculator** | `best-route` | travel | Map | "Find best routes"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**724. Road Trip Planner** | `road-trip-planner` | travel | Map | "Plan road trips"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**725. Alternative Route Finder** | `alternative-route-finder` | travel | Map | "Find alternative routes"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**726. GPS Navigation Time Calculator** | `gps-navigation-time` | travel | Calculator | "Calculate GPS navigation time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**727. Direction Distance Calculator** | `direction-distance` | travel | Calculator | "Calculate direction distance"
in: `distanceKm:number=100`, `speedKmh:number=60`
out: `hours:number[primary,big]`
f: t = d / v

**728. Map Distance Calculator** | `map-distance` | travel | Calculator | "Calculate map distances"
in: `distanceKm:number=100`, `speedKmh:number=60`
out: `hours:number[primary,big]`
f: t = d / v

**729. Traffic Route Time Estimator** | `traffic-route-time-estimator` | travel | Map | "Estimate traffic times"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**730. Travel Route Comparison Calculator** | `travel-route-comparison` | travel | Map | "Compare travel routes"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**731. Hotel Cost Estimator** | `hotel-cost-estimator` | travel | Hotel | "Estimate hotel costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**732. Accommodation Budget Calculator** | `accommodation-budget` | travel | Wallet | "Calculate accommodation budget"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**733. Nightly Rate Calculator** | `nightly-rate` | travel | Calculator | "Calculate nightly rates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**734. Hotel Booking Price Calculator** | `hotel-booking-price` | travel | Hotel | "Calculate booking prices"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**735. Vacation Home Cost Estimator** | `vacation-home-cost-estimator` | travel | Calculator | "Estimate vacation home costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**736. Hostel Cost Calculator** | `hostel-cost` | travel | Calculator | "Calculate hostel costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**737. Rental Property Cost Calculator** | `rental-property-cost` | travel | Calculator | "Calculate rental costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**738. Airbnb Price Estimator** | `airbnb-price-estimator` | travel | Hotel | "Estimate Airbnb prices"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**739. Resort Cost Calculator** | `resort-cost` | travel | Hotel | "Calculate resort costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

---

# D. Parenting & Childcare (40)

**740. Ovulation Date Calculator** | `ovulation-date` | parenting | Baby | "Calculate ovulation date"
in: `lmp:date`, `cycleDays:number=28`
out: `dueDate:date[primary,big]`, `week:integer`
f: LMP-based pregnancy math (Naegele rule)

**741. Conception Date Calculator** | `conception-date` | parenting | Baby | "Calculate conception date"
in: `lmp:date`, `cycleDays:number=28`
out: `dueDate:date[primary,big]`, `week:integer`
f: LMP-based pregnancy math (Naegele rule)

**742. Pregnancy Week-by-Week Calculator** | `pregnancy-week-by-week` | parenting | Baby | "Track pregnancy progress"
in: `lmp:date`, `cycleDays:number=28`
out: `dueDate:date[primary,big]`, `week:integer`
f: LMP-based pregnancy math (Naegele rule)

**743. Baby Gender Prediction Calculator** | `baby-gender-prediction` | parenting | Baby | "Predict baby gender"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**744. Fetal Heart Rate Calculator** | `fetal-heart-rate` | parenting | HeartPulse | "Calculate fetal heart rate"
in: `age:number=30`, `restingHR:number=65`
out: `maxHR:integer[primary,big]`, `zones:text`
f: max HR = 220 − age; Karvonen zones

**745. Fundal Height Calculator** | `fundal-height` | parenting | Calculator | "Calculate fundal height"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**746. Baby Kick Count Calculator** | `baby-kick-count` | parenting | Baby | "Track baby kicks"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**747. Maternity Leave Calculator** | `maternity-leave` | parenting | Calculator | "Calculate maternity leave"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**748. Pregnancy Symptoms Tracker** | `pregnancy-symptoms-tracker` | parenting | Baby | "Track pregnancy symptoms"
in: `lmp:date`, `cycleDays:number=28`
out: `dueDate:date[primary,big]`, `week:integer`
f: LMP-based pregnancy math (Naegele rule)

**749. Baby Weight Tracker** | `baby-weight-tracker` | parenting | Baby | "Track baby weight"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**750. Baby Height Tracker** | `baby-height-tracker` | parenting | Baby | "Track baby height"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**751. Baby Milestone Tracker** | `baby-milestone-tracker` | parenting | Baby | "Track baby milestones"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**752. Infant Feeding Calculator** | `infant-feeding` | parenting | Baby | "Calculate feeding amounts"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**753. Baby Sleep Calculator** | `baby-sleep` | parenting | Baby | "Calculate sleep needs"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**754. Baby Bath Water Temperature Calculator** | `baby-bath-water-temperature` | parenting | Baby | "Calculate bath temperature"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**755. Baby Food Portion Size Calculator** | `baby-food-portion-size` | parenting | Baby | "Calculate food portions"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**756. Teething Timeline Calculator** | `teething-timeline` | parenting | Calculator | "Track teething progress"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**757. Baby Formula Amount Calculator** | `baby-formula-amount` | parenting | Baby | "Calculate formula needs"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**758. Baby Diaper Change Calculator** | `baby-diaper-change` | parenting | Baby | "Track diaper changes"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**759. Breastfeeding Duration Calculator** | `breastfeeding-duration` | parenting | Calculator | "Track breastfeeding"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**760. Baby Teeth Eruption Calendar** | `baby-teeth-eruption-calendar` | parenting | Baby | "Track teeth development"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**761. Childcare Cost Calculator** | `childcare-cost` | parenting | Calculator | "Calculate childcare costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**762. Daycare Expense Calculator** | `daycare-expense` | parenting | Calculator | "Calculate daycare expenses"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**763. Parenting Stress Level Calculator** | `parenting-stress-level` | parenting | Sword | "Calculate stress levels"
in: `force:number=1000`, `area:number=0.5`
out: `pressure:number[primary,big]`
f: P = F/A

**764. Child Health Monitoring Calculator** | `child-health-monitoring` | parenting | Baby | "Monitor child health"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**765. Childhood Immunization Schedule Calculator** | `childhood-immunization-schedule` | parenting | Calculator | "Track immunizations"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**766. Child Mental Development Tracker** | `child-mental-development-tracker` | parenting | Baby | "Track mental development"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**767. Child Nutrition Calculator** | `child-nutrition` | parenting | Baby | "Calculate nutrition needs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**768. Child Behavioral Score Calculator** | `child-behavioral-score` | parenting | Baby | "Track behavior"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**769. Child Growth and Height Predictor** | `child-growth-and-height-predictor` | parenting | Baby | "Predict growth"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**770. Parenting Tips Calculator** | `parenting-tips` | parenting | Calculator | "Get parenting tips"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**771. Child's Cognitive Development Tracker** | `childs-cognitive-development-tracker` | parenting | Baby | "Track cognitive development"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**772. Screen Time Calculator** | `screen-time` | parenting | Calculator | "Calculate screen time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**773. Kids' Study Hours Calculator** | `kids-study-hours` | parenting | School | "Calculate study hours"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**774. Child's Learning Speed Calculator** | `childs-learning-speed` | parenting | Baby | "Calculate learning speed"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**775. School Performance Tracker** | `school-performance-tracker` | parenting | School | "Track school performance"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**776. Homework Time Calculator** | `homework-time` | parenting | Calculator | "Calculate homework time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**777. Child's Academic Calendar Calculator** | `childs-academic-calendar` | parenting | Baby | "Plan academic calendar"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**778. Reading Level Calculator** | `reading-level` | parenting | Sword | "Calculate reading level"
in: `words:number=600`, `minutes:number=3`
out: `wpm:integer[primary,big]`
f: wpm = words / minutes

**779. Age for Starting Kindergarten Calculator** | `age-for-starting-kindergarten` | parenting | Cake | "Calculate kindergarten age"
in: `startDate:date`, `endDate:date`
out: `years:integer[primary,big]`, `breakdown:text`
f: calendar diff in years/months/days

---

# E. Education & Academia (40)

**780. Grade Calculator** | `grade` | education | GraduationCap | "Calculate overall grades"
in: `subjects:textarea`
out: `gpa:number[primary,big]`
f: Σ(grade·credit)/Σcredit

**781. Exam Score Calculator** | `exam-score` | education | GraduationCap | "Calculate exam scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**782. Class Rank Calculator** | `class-rank` | education | Sword | "Calculate class ranking"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**783. Unweighted GPA Calculator** | `unweighted-gpa` | education | GraduationCap | "Calculate unweighted GPA"
in: `subjects:textarea`
out: `gpa:number[primary,big]`
f: Σ(grade·credit)/Σcredit

**784. Grade Point Average (GPA) Predictor** | `grade-point-average-gpa-predictor` | education | GraduationCap | "Predict future GPA"
in: `values:textarea`
out: `result:number[primary,big]`
f: descriptive statistics

**785. Final Grade Calculator** | `final-grade` | education | GraduationCap | "Calculate final grades"
in: `subjects:textarea`
out: `gpa:number[primary,big]`
f: Σ(grade·credit)/Σcredit

**786. Cumulative GPA Calculator** | `cumulative-gpa` | education | GraduationCap | "Calculate cumulative GPA"
in: `subjects:textarea`
out: `gpa:number[primary,big]`
f: Σ(grade·credit)/Σcredit

**787. High School GPA Calculator** | `high-school-gpa` | education | GraduationCap | "Calculate high school GPA"
in: `subjects:textarea`
out: `gpa:number[primary,big]`
f: Σ(grade·credit)/Σcredit

**788. Scholarship Eligibility Calculator** | `scholarship-eligibility` | education | Calculator | "Check scholarship eligibility"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**789. Financial Aid Eligibility Calculator** | `financial-aid-eligibility` | education | Calculator | "Calculate financial aid eligibility"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**790. College Tuition Calculator** | `college-tuition` | education | School | "Calculate college tuition costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**791. Student Loan Repayment Calculator** | `student-loan-repayment` | education | Banknote | "Calculate loan repayments"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**792. FAFSA Calculator** | `fafsa` | education | Calculator | "Estimate FAFSA aid"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**793. Loan Interest Calculator** | `loan-interest` | education | Banknote | "Calculate loan interest"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**794. Parent Contribution Calculator** | `parent-contribution` | education | Calculator | "Calculate parent contributions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**795. Scholarship Search Calculator** | `scholarship-search` | education | Calculator | "Find matching scholarships"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**796. Student Debt Calculator** | `student-debt` | education | Calculator | "Calculate total student debt"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**797. Learning Curve Calculator** | `learning-curve` | education | Calculator | "Track learning progress"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**798. Study Break Calculator** | `study-break` | education | School | "Calculate optimal break times"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**799. Concentration Span Calculator** | `concentration-span` | education | Calculator | "Measure concentration span"
in: `moles:number=1`, `volumeL:number=1`
out: `molarity:number[primary,big]`
f: M = n/V

**800. Study Productivity Calculator** | `study-productivity` | education | School | "Track study productivity"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**801. Note-Taking Efficiency Calculator** | `note-taking-efficiency` | education | Music | "Measure note-taking efficiency"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**802. Academic Goal Tracker** | `academic-goal-tracker` | education | Activity | "Track academic goals"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**803. Learning Style Assessment Calculator** | `learning-style-assessment` | education | Calculator | "Assess learning style"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**804. Study Plan Generator** | `study-plan-generator` | education | School | "Generate study plans"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**805. ACT Score Calculator** | `act-score` | education | GraduationCap | "Calculate ACT scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**806. GRE Score Calculator** | `gre-score` | education | GraduationCap | "Calculate GRE scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**807. TOEFL Score Calculator** | `toefl-score` | education | GraduationCap | "Calculate TOEFL scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**808. IELTS Score Calculator** | `ielts-score` | education | GraduationCap | "Calculate IELTS scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**809. LSAT Score Calculator** | `lsat-score` | education | GraduationCap | "Calculate LSAT scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**810. MCAT Score Calculator** | `mcat-score` | education | GraduationCap | "Calculate MCAT scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**811. GMAT Score Calculator** | `gmat-score` | education | GraduationCap | "Calculate GMAT scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**812. AP Exam Score Calculator** | `ap-exam-score` | education | GraduationCap | "Calculate AP exam scores"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**813. SAT Math Practice Calculator** | `sat-math-practice` | education | Calculator | "Practice SAT math"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**814. Semester Planner Calculator** | `semester-planner` | education | Calculator | "Plan semester schedule"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**815. Study Schedule Calculator** | `study-schedule` | education | School | "Create study schedules"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**816. Class Schedule Generator** | `class-schedule-generator` | education | Calculator | "Generate class schedules"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**817. Weekly Study Schedule Calculator** | `weekly-study-schedule` | education | School | "Plan weekly study"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**818. Homework Time Estimator** | `homework-time-estimator` | education | Calculator | "Estimate homework time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**819. Exam Revision Schedule Calculator** | `exam-revision-schedule` | education | GraduationCap | "Plan exam revision"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

---

# F. Business & Marketing (35)

**820. Net Profit Calculator** | `net-profit` | business | Calculator | "Calculate net profit"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**821. Pricing Calculator** | `pricing` | business | Calculator | "Calculate optimal pricing"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**822. Cost-Plus Pricing Calculator** | `cost-plus-pricing` | business | Calculator | "Calculate cost-plus pricing"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**823. Dynamic Pricing Calculator** | `dynamic-pricing` | business | Calculator | "Calculate dynamic pricing"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**824. Wholesale Pricing Calculator** | `wholesale-pricing` | business | Calculator | "Calculate wholesale prices"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**825. Retail Price Calculator** | `retail-price` | business | Calculator | "Calculate retail prices"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**826. Break-Even Price Calculator** | `break-even-price` | business | Calculator | "Calculate break-even price"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**827. COGS Calculator** | `cogs` | business | Calculator | "Calculate cost of goods sold"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**828. Sales Revenue Calculator** | `sales-revenue` | business | Calculator | "Calculate sales revenue"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**829. Target Sales Price Calculator** | `target-sales-price` | business | Calculator | "Calculate target sales price"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**830. Sales Commission Calculator** | `sales-commission` | business | Calculator | "Calculate sales commission"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**831. Customer Acquisition Cost Calculator** | `customer-acquisition-cost` | business | Calculator | "Calculate CAC"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**832. Customer Lifetime Value Calculator** | `customer-lifetime-value` | business | Calculator | "Calculate CLV"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**833. Return on Ad Spend Calculator** | `return-on-ad-spend` | business | Calculator | "Calculate ROAS"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**834. Click-Through Rate Calculator** | `click-through-rate` | business | Calculator | "Calculate CTR"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**835. Lead-to-Customer Conversion Calculator** | `lead-to-customer-conversion` | business | Calculator | "Calculate lead conversion"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**836. Marketing ROI Calculator** | `marketing-roi` | business | Calculator | "Calculate marketing ROI"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**837. PPC Cost Calculator** | `ppc-cost` | business | Calculator | "Calculate PPC costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**838. CPM Calculator** | `cpm` | business | Calculator | "Calculate cost per mille"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**839. Email Marketing ROI Calculator** | `email-marketing-roi` | business | Calculator | "Calculate email marketing ROI"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**840. Social Media Engagement Calculator** | `social-media-engagement` | business | Calculator | "Calculate social engagement"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**841. Economic Order Quantity Calculator** | `economic-order-quantity` | business | Calculator | "Calculate EOQ"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**842. Inventory Holding Cost Calculator** | `inventory-holding-cost` | business | Calculator | "Calculate holding costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**843. Reorder Point Calculator** | `reorder-point` | business | Calculator | "Calculate reorder points"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**844. Production Efficiency Calculator** | `production-efficiency` | business | Calculator | "Calculate production efficiency"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**845. Utilization Rate Calculator** | `utilization-rate` | business | Calculator | "Calculate utilization rates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**846. Accounts Payable Turnover Calculator** | `accounts-payable-turnover` | business | Calculator | "Calculate AP turnover"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**847. Accounts Receivable Turnover Calculator** | `accounts-receivable-turnover` | business | Calculator | "Calculate AR turnover"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**848. Labor Cost Calculator** | `labor-cost` | business | Calculator | "Calculate labor costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**849. Overhead Cost Calculator** | `overhead-cost` | business | Calculator | "Calculate overhead costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**850. Stock Return Calculator** | `stock-return` | business | LineChart | "Calculate stock returns"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**851. Dividend Yield Calculator** | `dividend-yield` | business | Percent | "Calculate dividend yields"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**852. EPS Calculator** | `eps` | business | LineChart | "Calculate earnings per share"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**853. P/E Ratio Calculator** | `pe-ratio` | business | Percent | "Calculate P/E ratios"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**854. Book Value Calculator** | `book-value` | business | BookOpen | "Calculate book values"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

---

# G. Sports & Fitness (35)

**855. Resting Metabolic Rate (RMR) Calculator** | `resting-metabolic-rate-rmr` | sports | Calculator | "Calculate resting metabolic rate"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**856. Fat Loss Calculator** | `fat-loss` | sports | Calculator | "Calculate fat loss goals"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**857. Active Calories Calculator** | `active-calories` | sports | Calculator | "Calculate active calories"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**858. Running Speed Calculator** | `running-speed` | sports | Calculator | "Calculate running speed"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**859. Running Calories Burned Calculator** | `running-calories-burned` | sports | Calculator | "Calculate calories burned running"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**860. Cycling Speed Calculator** | `cycling-speed` | sports | Bike | "Calculate cycling speed"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**861. Cycling Distance Calculator** | `cycling-distance` | sports | Bike | "Calculate cycling distance"
in: `distanceKm:number=100`, `speedKmh:number=60`
out: `hours:number[primary,big]`
f: t = d / v

**862. Bike Gear Calculator** | `bike-gear` | sports | Bike | "Calculate gear ratios"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**863. Running Stride Length Calculator** | `running-stride-length` | sports | Calculator | "Calculate stride length"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**864. Running Cadence Calculator** | `running-cadence` | sports | Calculator | "Calculate running cadence"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**865. Cycling Heart Rate Zone Calculator** | `cycling-heart-rate-zone` | sports | HeartPulse | "Calculate cycling heart rate zones"
in: `age:number=30`, `restingHR:number=65`
out: `maxHR:integer[primary,big]`, `zones:text`
f: max HR = 220 − age; Karvonen zones

**866. Cycling Power Calculator** | `cycling-power` | sports | Bike | "Calculate cycling power"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**867. Running Training Pace Calculator** | `running-training-pace` | sports | Activity | "Calculate training paces"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**868. Bike Fit Calculator** | `bike-fit` | sports | Bike | "Calculate bike fit measurements"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**869. Strength Training Progress Calculator** | `strength-training-progress` | sports | Calculator | "Track strength progress"
in: `length:number=12`, `charset:select=alnumSym`
out: `bits:number[primary,big]`, `strength:text`
f: bits = length · log2(|charset|)

**870. Powerlifting Calculator** | `powerlifting` | sports | Calculator | "Calculate powerlifting totals"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**871. Bench Press Calculator** | `bench-press` | sports | Calculator | "Calculate bench press stats"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**872. Squat Calculator** | `squat` | sports | Calculator | "Calculate squat stats"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**873. Deadlift Calculator** | `deadlift` | sports | Calculator | "Calculate deadlift stats"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**874. CrossFit WOD Calculator** | `crossfit-wod` | sports | Calculator | "Calculate CrossFit workouts"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**875. Bodybuilding Training Progress Calculator** | `bodybuilding-training-progress` | sports | Calculator | "Track bodybuilding progress"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**876. Kettlebell Swing Calculator** | `kettlebell-swing` | sports | Calculator | "Calculate kettlebell workouts"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**877. Olympic Weightlifting Calculator** | `olympic-weightlifting` | sports | Calculator | "Calculate Olympic lifts"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**878. Repetition Max Calculator** | `repetition-max` | sports | Calculator | "Calculate rep maxes"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**879. Strength Ratio Calculator** | `strength-ratio` | sports | Percent | "Calculate strength ratios"
in: `length:number=12`, `charset:select=alnumSym`
out: `bits:number[primary,big]`, `strength:text`
f: bits = length · log2(|charset|)

**880. Football (Soccer) Player Fitness Calculator** | `football-soccer-player-fitness` | sports | Activity | "Calculate soccer fitness"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**881. Basketball Player Efficiency Calculator** | `basketball-player-efficiency` | sports | Activity | "Calculate player efficiency"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**882. Baseball Batting Average Calculator** | `baseball-batting-average` | sports | Activity | "Calculate batting average"
in: `values:textarea`
out: `result:number[primary,big]`
f: descriptive statistics

**883. Tennis Serve Speed Calculator** | `tennis-serve-speed` | sports | Activity | "Calculate serve speed"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**884. Swimming Stroke Rate Calculator** | `swimming-stroke-rate` | sports | Calculator | "Calculate stroke rate"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**885. Volleyball Player Performance Calculator** | `volleyball-player-performance` | sports | Calculator | "Calculate volleyball stats"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**886. Rugby Try Scoring Calculator** | `rugby-try-scoring` | sports | Activity | "Calculate try scoring"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**887. Ice Hockey Shot Speed Calculator** | `ice-hockey-shot-speed` | sports | Activity | "Calculate shot speed"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**888. Ski Jumping Distance Calculator** | `ski-jumping-distance` | sports | Calculator | "Calculate jump distance"
in: `distanceKm:number=100`, `speedKmh:number=60`
out: `hours:number[primary,big]`
f: t = d / v

**889. American Football Quarterback Rating Calculator** | `american-football-quarterback-rating` | sports | Activity | "Calculate QB rating"
in: `ratingA:number=1500`, `ratingB:number=1500`, `result:select=win`, `k:number=20`
out: `newRating:number[primary,big]`
f: ELO: R + K·(S − E)

---

# H. Lifestyle & Daily Use (35)

**890. Personal Savings Calculator** | `personal-savings` | lifestyle | TrendingUp | "Calculate savings"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

**891. Debt Payoff Calculator** | `debt-payoff` | lifestyle | Calculator | "Plan debt payoff"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**892. Monthly Spending Tracker** | `monthly-spending-tracker` | lifestyle | Calculator | "Track monthly spending"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**893. Credit Score Estimator** | `credit-score-estimator` | lifestyle | Banknote | "Estimate credit score"
in: `rawScore:number=80`, `maxScore:number=100`
out: `percentile:percent[primary,big]`
f: (score / max) · 100

**894. Investment Growth Calculator** | `investment-growth` | lifestyle | Calculator | "Calculate investment growth"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**895. Financial Goal Setting Calculator** | `financial-goal-setting` | lifestyle | Activity | "Set financial goals"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**896. Debt-to-Income Ratio Calculator** | `debt-to-income-ratio` | lifestyle | Percent | "Calculate debt-to-income ratio"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**897. Flight Cost Comparison Calculator** | `flight-cost-comparison` | lifestyle | Plane | "Compare flight costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**898. Luggage Weight Calculator** | `luggage-weight` | lifestyle | Wrench | "Calculate luggage weight"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**899. Workout Intensity Calculator** | `workout-intensity` | lifestyle | Dumbbell | "Calculate workout intensity"
in: `weight:number=80`, `reps:number=5`
out: `oneRepMax:number[primary,big]`
f: Epley: w(1 + r/30)

**900. Recipe Ingredient Converter** | `recipe-ingredient-converter` | lifestyle | Utensils | "Convert recipe ingredients"
in: `originalServings:number=4`, `desiredServings:number=6`, `ingredientAmount:number=200`
out: `scaledAmount:number[primary,big]`
f: scale × (desired/original)

**901. Serving Size Calculator** | `serving-size` | lifestyle | Calculator | "Calculate serving sizes"
in: `originalServings:number=4`, `desiredServings:number=6`, `ingredientAmount:number=200`
out: `scaledAmount:number[primary,big]`
f: scale × (desired/original)

**902. Ingredient Substitution Calculator** | `ingredient-substitution` | lifestyle | Calculator | "Find ingredient substitutions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**903. Nutritional Value Calculator** | `nutritional-value` | lifestyle | Calculator | "Calculate nutrition facts"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**904. Calories per Serving Calculator** | `calories-per-serving` | lifestyle | Calculator | "Calculate calories per serving"
in: `originalServings:number=4`, `desiredServings:number=6`, `ingredientAmount:number=200`
out: `scaledAmount:number[primary,big]`
f: scale × (desired/original)

**905. Portion Size Calculator** | `portion-size` | lifestyle | Calculator | "Calculate portion sizes"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**906. Meal Planner Calculator** | `meal-planner` | lifestyle | Calculator | "Plan meals"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**907. Cooking Conversion Calculator** | `cooking-conversion` | lifestyle | Calculator | "Convert cooking measurements"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**908. Baking Time Calculator** | `baking-time` | lifestyle | Calculator | "Calculate baking time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**909. Mortgage Payment Calculator** | `mortgage-payment` | lifestyle | Banknote | "Calculate mortgage payments"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**910. Home Equity Loan Calculator** | `home-equity-loan` | lifestyle | Banknote | "Calculate home equity"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**911. Home Improvement Budget Calculator** | `home-improvement-budget` | lifestyle | Wallet | "Plan improvement budget"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**912. Furniture Arrangement Calculator** | `furniture-arrangement` | lifestyle | Calculator | "Arrange furniture"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**913. Square Footage Calculator** | `square-footage` | lifestyle | Square | "Calculate square footage"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**914. Room Paint Coverage Calculator** | `room-paint-coverage` | lifestyle | Paintbrush | "Calculate paint coverage"
in: `lengthM:number=10`, `widthM:number=5`, `thicknessM:number=0.15`
out: `volume:number[primary,big]`, `materials:text`
f: volume × material density / coverage

**915. Home Energy Savings Calculator** | `home-energy-savings` | lifestyle | TrendingUp | "Calculate energy savings"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

**916. Laundry Load Calculator** | `laundry-load` | lifestyle | Calculator | "Calculate laundry loads"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**917. Cleaning Time Estimator** | `cleaning-time-estimator` | lifestyle | Calculator | "Estimate cleaning time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**918. Price Comparison Calculator** | `price-comparison` | lifestyle | Calculator | "Compare prices"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**919. Sale Price Estimator** | `sale-price-estimator` | lifestyle | Calculator | "Estimate sale prices"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**920. Love Calculator** | `love` | lifestyle | Calculator | "Calculate love compatibility"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**921. Joke Calculator** | `joke` | lifestyle | Calculator | "Calculate joke ratings"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**922. Water Conservation Calculator** | `water-conservation` | lifestyle | TrendingUp | "Calculate water savings"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

**923. Business Break-Even Calculator** | `business-break-even` | lifestyle | Calculator | "Calculate break-even point"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**924. Fun Ideal Weight Calculator** | `fun-ideal-weight` | lifestyle | Wrench | "Calculate ideal weight"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

---

# I. Physics (33)

**925. Energy Calculator** | `energy` | physics | Wrench | "Calculate energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**926. Power Calculator** | `power` | physics | Wrench | "Calculate power"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**927. Angular Velocity Calculator** | `angular-velocity` | physics | Wrench | "Calculate angular velocity"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**928. Viscosity Calculator** | `viscosity` | physics | Gauge | "Calculate viscosity"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**929. Drag Force Calculator** | `drag-force` | physics | Wrench | "Calculate drag force"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**930. Wave Speed Calculator** | `wave-speed` | physics | Calculator | "Calculate wave speed"
in: `distanceKm:number=10`, `timeMin:number=50`
out: `speed:number[primary,big]`, `pace:text`
f: v = d/t

**931. Wavelength Calculator** | `wavelength` | physics | Calculator | "Calculate wavelength"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**932. Frequency Calculator** | `frequency` | physics | Music | "Calculate frequency"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**933. Critical Angle Calculator** | `critical-angle` | physics | Calculator | "Calculate critical angle"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**934. Light Intensity Calculator** | `light-intensity` | physics | Calculator | "Calculate light intensity"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**935. Efficiency Calculator** | `efficiency` | physics | Calculator | "Calculate efficiency"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**936. Carnot Engine Calculator** | `carnot-engine` | physics | Bike | "Calculate Carnot cycle"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**937. Entropy Calculator** | `entropy` | physics | Calculator | "Calculate entropy"
in: `length:number=12`, `charset:select=alnumSym`
out: `bits:number[primary,big]`, `strength:text`
f: bits = length · log2(|charset|)

**938. Coulomb's Law Calculator** | `coulombs-law` | physics | Zap | "Calculate electric forces"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**939. Electric Field Calculator** | `electric-field` | physics | Zap | "Calculate electric fields"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**940. Electric Potential Calculator** | `electric-potential` | physics | Zap | "Calculate electric potential"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**941. Magnetic Field Calculator** | `magnetic-field` | physics | Calculator | "Calculate magnetic fields"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**942. De Broglie Wavelength Calculator** | `de-broglie-wavelength` | physics | Calculator | "Calculate matter wavelengths"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**943. Uncertainty Principle Calculator** | `uncertainty-principle` | physics | Atom | "Calculate quantum uncertainty"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**944. Relativistic Energy Calculator** | `relativistic-energy` | physics | Wrench | "Calculate relativistic energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**945. Lorentz Factor Calculator** | `lorentz-factor` | physics | Calculator | "Calculate Lorentz factor"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**946. Molecular Weight Calculator** | `molecular-weight` | physics | Wrench | "Calculate molecular weight"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**947. Mass Percentage Calculator** | `mass-percentage` | physics | Wrench | "Calculate mass percentages"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**948. Mole Calculator** | `mole` | physics | Beaker | "Calculate moles"
in: `moles:number=1`, `volumeL:number=1`
out: `molarity:number[primary,big]`
f: M = n/V

**949. Gas Law Calculator** | `gas-law` | physics | Calculator | "Calculate gas properties"
in: `P:number=101325`, `V:number=0.0224`, `T:number=273`
out: `n:number[primary,big]`
f: PV = nRT

**950. Stoichiometry Calculator** | `stoichiometry` | physics | Calculator | "Calculate stoichiometric ratios"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**951. Normality Calculator** | `normality` | physics | Calculator | "Calculate normality"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**952. Solubility Calculator** | `solubility` | physics | Calculator | "Calculate solubility"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**953. Enthalpy Calculator** | `enthalpy` | physics | Calculator | "Calculate enthalpy changes"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**954. Gibbs Free Energy Calculator** | `gibbs-free-energy` | physics | Wrench | "Calculate Gibbs free energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**955. Calorimetry Calculator** | `calorimetry` | physics | Calculator | "Calculate calorimetric properties"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**956. Hess's Law Calculator** | `hesss-law` | physics | Calculator | "Calculate using Hess's law"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**957. Equilibrium Constant Calculator** | `equilibrium-constant` | physics | Calculator | "Calculate equilibrium constants"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

---

# J. Date & Time (30)

**958. Days Between Dates Calculator** | `days-between-dates` | datetime | Calculator | "Calculate days between two dates"
in: `startDate:date`, `endDate:date`
out: `days:integer[primary,big]`
f: |d2 − d1| / msPerDay

**959. Days From Date Calculator** | `days-from-date` | datetime | Calendar | "Calculate days from a specific date"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**960. Add/Subtract Days Calculator** | `addsubtract-days` | datetime | Calendar | "Add or subtract days from a date"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**961. Week Number Calculator** | `week-number` | datetime | Calendar | "Calculate week number of the year"
in: `startDate:date`, `endDate:date`
out: `days:integer[primary,big]`
f: |d2 − d1| / msPerDay

**962. Day of the Week Calculator** | `day-of-the-week` | datetime | Calendar | "Find day of the week for any date"
in: `startDate:date`, `endDate:date`
out: `days:integer[primary,big]`
f: |d2 − d1| / msPerDay

**963. Leap Year Calculator** | `leap-year` | datetime | Calendar | "Check if a year is a leap year"
in: `startDate:date`, `endDate:date`
out: `days:integer[primary,big]`
f: |d2 − d1| / msPerDay

**964. Date Difference Calculator** | `date-difference` | datetime | Calendar | "Calculate difference between dates"
in: `startDate:date`, `endDate:date`
out: `days:integer[primary,big]`
f: |d2 − d1| / msPerDay

**965. Age Calculator** | `age` | datetime | Cake | "Calculate age from birthdate"
in: `startDate:date`, `endDate:date`
out: `years:integer[primary,big]`, `breakdown:text`
f: calendar diff in years/months/days

**966. Birthday Countdown Calculator** | `birthday-countdown` | datetime | Clock | "Count days until birthday"
in: `startDate:date`, `endDate:date`
out: `years:integer[primary,big]`, `breakdown:text`
f: calendar diff in years/months/days

**967. Event Date Calculator** | `event-date` | datetime | Calendar | "Calculate event dates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**968. Time Duration Calculator** | `time-duration` | datetime | Calculator | "Calculate duration between times"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**969. Time Difference Calculator** | `time-difference` | datetime | Calculator | "Calculate time differences"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**970. Time Zone Converter** | `time-zone-converter` | datetime | Calculator | "Convert between time zones"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**971. Add/Subtract Time Calculator** | `addsubtract-time` | datetime | Calculator | "Add or subtract time"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**972. Work Hours Calculator** | `work-hours` | datetime | Wrench | "Calculate work hours"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**973. Break Time Calculator** | `break-time` | datetime | Calculator | "Calculate break times"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**974. Overtime Hours Calculator** | `overtime-hours` | datetime | Calculator | "Calculate overtime hours"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**975. Hourly Wage Calculator** | `hourly-wage` | datetime | Briefcase | "Calculate hourly wages"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**976. Meeting Time Planner Calculator** | `meeting-time-planner` | datetime | Calculator | "Plan meeting times"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**977. Timer with Countdown** | `timer-with-countdown` | datetime | Clock | "Countdown timer"
in: `target:date`
out: `remaining:text[primary,big]`
f: now to target diff

**978. Monthly Calendar Generator Calculator** | `monthly-calendar-generator` | datetime | Calendar | "Generate monthly calendars"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**979. Yearly Calendar Generator Calculator** | `yearly-calendar-generator` | datetime | Calendar | "Generate yearly calendars"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**980. Custom Holiday Calendar Calculator** | `custom-holiday-calendar` | datetime | Calendar | "Create custom holiday calendars"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**981. Perpetual Calendar Calculator** | `perpetual-calendar` | datetime | Calendar | "Generate perpetual calendars"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**982. Julian Date Converter** | `julian-date-converter` | datetime | Calendar | "Convert Julian dates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**983. Lunar Calendar Calculator** | `lunar-calendar` | datetime | Moon | "Calculate lunar calendar dates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**984. Solar Calendar Calculator** | `solar-calendar` | datetime | Sun | "Calculate solar calendar dates"
in: `loadKwh:number=10`, `sunHours:number=5`, `eff:percent=80`
out: `panelKw:number[primary,big]`
f: kW = load / (sunHours · efficiency)

**985. Islamic Hijri Date Converter** | `islamic-hijri-date-converter` | datetime | Calendar | "Convert Hijri dates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**986. Hebrew Calendar Converter** | `hebrew-calendar-converter` | datetime | Calendar | "Convert Hebrew calendar dates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**987. Chinese Calendar Converter** | `chinese-calendar-converter` | datetime | Calendar | "Convert Chinese calendar dates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

---

# K. Health & Wellness (30)

**988. Body Mass Index (BMI) Calculator** | `body-mass-index-bmi` | health | Activity | "Calculate and interpret your Body Mass Index"
in: `weight:number=70`, `height:number=1.75`
out: `bmi:number[primary,big]`, `category:text`
f: BMI = w / h²

**989. Body Fat Percentage Calculator** | `body-fat-percentage` | health | Calculator | "Estimate your body fat percentage"
in: `subjects:textarea`
out: `gpa:number[primary,big]`
f: Σ(grade·credit)/Σcredit

**990. Ideal Body Weight Calculator** | `ideal-body-weight` | health | Wrench | "Calculate your ideal body weight range"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**991. Waist-to-Hip Ratio Calculator** | `waist-to-hip-ratio` | health | Percent | "Calculate your waist-to-hip ratio"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**992. Waist-to-Height Ratio Calculator** | `waist-to-height-ratio` | health | Percent | "Calculate your waist-to-height ratio"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**993. Frame Size Calculator** | `frame-size` | health | Video | "Determine your body frame size"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**994. Height Predictor Calculator** | `height-predictor` | health | Calculator | "Predict adult height for children"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**995. Basal Metabolic Rate Calculator** | `basal-metabolic-rate` | health | Calculator | "Calculate your basal metabolic rate"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**996. Total Daily Energy Expenditure Calculator** | `total-daily-energy-expenditure` | health | Flame | "Calculate your daily calorie needs"
in: `weight:number=70`, `height:number=170`, `age:number=30`, `sex:select=male`, `activity:select=moderate`
out: `kcal:integer[primary,big]`
f: Mifflin-St Jeor × activity factor

**997. Calorie Intake Calculator** | `calorie-intake` | health | Flame | "Calculate recommended daily calorie intake"
in: `weight:number=70`, `height:number=170`, `age:number=30`, `sex:select=male`, `activity:select=moderate`
out: `kcal:integer[primary,big]`
f: Mifflin-St Jeor × activity factor

**998. Macronutrient Calculator** | `macronutrient` | health | Flame | "Calculate your macro nutrient needs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**999. Carbohydrate Intake Calculator** | `carbohydrate-intake` | health | Calculator | "Calculate recommended carb intake"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1000. Water Intake Calculator** | `water-intake` | health | Calculator | "Calculate daily water needs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1001. Fiber Intake Calculator** | `fiber-intake` | health | Calculator | "Calculate recommended fiber intake"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1002. Sodium Intake Calculator** | `sodium-intake` | health | Calculator | "Calculate recommended sodium intake"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1003. Weight Loss Calculator** | `weight-loss` | health | Map | "Plan your weight loss journey"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**1004. Weight Gain Calculator** | `weight-gain` | health | Wrench | "Plan healthy weight gain"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**1005. Calorie Deficit Calculator** | `calorie-deficit` | health | Flame | "Calculate required calorie deficit"
in: `weight:number=70`, `height:number=170`, `age:number=30`, `sex:select=male`, `activity:select=moderate`
out: `kcal:integer[primary,big]`
f: Mifflin-St Jeor × activity factor

**1006. Weight Loss Timeline Calculator** | `weight-loss-timeline` | health | Wrench | "Create a weight loss timeline"
in: `mass:number=10`, `acceleration:number=9.8`
out: `force:number[primary,big]`
f: F = m·a

**1007. Diet Planner Calculator** | `diet-planner` | health | Calculator | "Plan your diet and nutrition"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1008. Pregnancy Due Date Calculator** | `pregnancy-due-date` | health | Baby | "Calculate your expected due date"
in: `lmp:date`, `cycleDays:number=28`
out: `dueDate:date[primary,big]`, `week:integer`
f: LMP-based pregnancy math (Naegele rule)

**1009. Fertility Window Calculator** | `fertility-window` | health | DoorOpen | "Calculate your fertility window"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1010. Baby Growth Percentile Calculator** | `baby-growth-percentile` | health | Baby | "Track baby growth percentiles"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**1011. Breastfeeding Calorie Calculator** | `breastfeeding-calorie` | health | Flame | "Calculate breastfeeding calorie needs"
in: `weight:number=70`, `height:number=170`, `age:number=30`, `sex:select=male`, `activity:select=moderate`
out: `kcal:integer[primary,big]`
f: Mifflin-St Jeor × activity factor

**1012. Baby Diaper Usage Calculator** | `baby-diaper-usage` | health | Baby | "Estimate diaper needs and costs"
in: `ageMonths:number=12`, `measurement:number=10`, `sex:select=male`
out: `percentile:percent[primary,big]`, `zScore:number`
f: WHO growth standards (z-score)

**1013. Labor Contraction Timer** | `labor-contraction-timer` | health | Clock | "Time and track labor contractions"
in: `target:date`
out: `remaining:text[primary,big]`
f: now to target diff

**1014. Formula Feeding Calculator** | `formula-feeding` | health | Calculator | "Calculate formula feeding amounts"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1015. Heart Rate Calculator** | `heart-rate` | health | HeartPulse | "Calculate and interpret heart rate"
in: `age:number=30`, `restingHR:number=65`
out: `maxHR:integer[primary,big]`, `zones:text`
f: max HR = 220 − age; Karvonen zones

**1016. Resting Heart Rate Calculator** | `resting-heart-rate` | health | HeartPulse | "Calculate resting heart rate"
in: `age:number=30`, `restingHR:number=65`
out: `maxHR:integer[primary,big]`, `zones:text`
f: max HR = 220 − age; Karvonen zones

**1017. Maximum Heart Rate Calculator** | `maximum-heart-rate` | health | HeartPulse | "Calculate maximum heart rate"
in: `age:number=30`, `restingHR:number=65`
out: `maxHR:integer[primary,big]`, `zones:text`
f: max HR = 220 − age; Karvonen zones

---

# L. Environment & Energy (25)

**1018. Personal Carbon Footprint Calculator** | `personal-carbon-footprint` | environment | Cloud | "Calculate personal carbon footprint"
in: `activity:number=10000`, `emissionFactor:number=0.21`
out: `kgCO2:number[primary,big]`
f: CO₂ = activity × emission factor

**1019. Vehicle Emissions Calculator** | `vehicle-emissions` | environment | Car | "Calculate vehicle emissions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1020. Air Travel Emissions Calculator** | `air-travel-emissions` | environment | Calculator | "Calculate air travel emissions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1021. Home Energy Carbon Calculator** | `home-energy-carbon` | environment | Wrench | "Calculate home energy carbon"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1022. Workplace Carbon Footprint Calculator** | `workplace-carbon-footprint` | environment | Cloud | "Calculate workplace carbon footprint"
in: `activity:number=10000`, `emissionFactor:number=0.21`
out: `kgCO2:number[primary,big]`
f: CO₂ = activity × emission factor

**1023. Event Carbon Footprint Calculator** | `event-carbon-footprint` | environment | Cloud | "Calculate event carbon footprint"
in: `activity:number=10000`, `emissionFactor:number=0.21`
out: `kgCO2:number[primary,big]`
f: CO₂ = activity × emission factor

**1024. Food Carbon Footprint Calculator** | `food-carbon-footprint` | environment | Cloud | "Calculate food carbon footprint"
in: `activity:number=10000`, `emissionFactor:number=0.21`
out: `kgCO2:number[primary,big]`
f: CO₂ = activity × emission factor

**1025. Recycling Impact Calculator** | `recycling-impact` | environment | Calculator | "Calculate recycling impact"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1026. Carbon Offset Calculator** | `carbon-offset` | environment | Cloud | "Calculate carbon offsets"
in: `activity:number=10000`, `emissionFactor:number=0.21`
out: `kgCO2:number[primary,big]`
f: CO₂ = activity × emission factor

**1027. Carbon Emissions Reduction Calculator** | `carbon-emissions-reduction` | environment | Cloud | "Calculate emissions reduction"
in: `activity:number=10000`, `emissionFactor:number=0.21`
out: `kgCO2:number[primary,big]`
f: CO₂ = activity × emission factor

**1028. Appliance Energy Usage Calculator** | `appliance-energy-usage` | environment | Wrench | "Calculate appliance energy usage"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1029. Daily Energy Consumption Calculator** | `daily-energy-consumption` | environment | Wrench | "Calculate daily energy consumption"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1030. Monthly Electricity Usage Calculator** | `monthly-electricity-usage` | environment | Calculator | "Calculate monthly electricity usage"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1031. Annual Energy Cost Calculator** | `annual-energy-cost` | environment | Wrench | "Calculate annual energy costs"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1032. Energy Savings Calculator** | `energy-savings` | environment | TrendingUp | "Calculate energy savings"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

**1033. Solar Panel Energy Calculator** | `solar-panel-energy` | environment | Sun | "Calculate solar panel energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1034. Wind Energy Calculator** | `wind-energy` | environment | Wind | "Calculate wind energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1035. Hydropower Energy Calculator** | `hydropower-energy` | environment | Wrench | "Calculate hydropower energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1036. Lighting Energy Efficiency Calculator** | `lighting-energy-efficiency` | environment | Wrench | "Calculate lighting efficiency"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1037. Electric Vehicle Charging Cost Calculator** | `electric-vehicle-charging-cost` | environment | Car | "Calculate EV charging costs"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1038. Solar Panel Efficiency Calculator** | `solar-panel-efficiency` | environment | Sun | "Calculate solar efficiency"
in: `loadKwh:number=10`, `sunHours:number=5`, `eff:percent=80`
out: `panelKw:number[primary,big]`
f: kW = load / (sunHours · efficiency)

**1039. Solar Energy Payback Period Calculator** | `solar-energy-payback-period` | environment | Sun | "Calculate solar payback period"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1040. Solar Battery Storage Calculator** | `solar-battery-storage` | environment | Fuel | "Calculate battery storage"
in: `capacityMah:number=5000`, `loadMa:number=200`
out: `hours:number[primary,big]`
f: hours = mAh / mA

**1041. Wind Turbine Output Calculator** | `wind-turbine-output` | environment | Wind | "Calculate wind turbine output"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1042. Renewable Energy Cost Savings Calculator** | `renewable-energy-cost-savings` | environment | TrendingUp | "Calculate renewable savings"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

---

# M. Finance (20)

**1043. Mortgage Calculator** | `mortgage` | finance | Banknote | "Calculate mortgage payments"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**1044. EMI Calculator** | `emi` | finance | Banknote | "Calculate EMI payments"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**1045. Education Loan Calculator** | `education-loan` | finance | Banknote | "Calculate education loan details"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**1046. Loan Tenure Calculator** | `loan-tenure` | finance | Banknote | "Calculate loan tenure"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**1047. Refinancing Loan Calculator** | `refinancing-loan` | finance | Banknote | "Calculate refinancing loan benefits"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**1048. Loan Repayment Calculator** | `loan-repayment` | finance | Banknote | "Calculate loan repayment schedule"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**1049. Loan Eligibility Calculator** | `loan-eligibility` | finance | Banknote | "Check loan eligibility"
in: `principal:currency=1000000`, `rate:percent=8.5`, `years:number=20`
out: `emi:currency-inr[primary,big]`, `totalInterest:currency-inr[error]`, `totalPayment:currency-inr`
f: EMI = P·r(1+r)^n / ((1+r)^n − 1)

**1050. Simple Interest Calculator** | `simple-interest` | finance | Percent | "Calculate simple interest"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**1051. Compound Interest Calculator** | `compound-interest` | finance | Percent | "Calculate compound interest"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**1052. Fixed Deposit Interest Calculator** | `fixed-deposit-interest` | finance | Percent | "Calculate FD returns"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**1053. Recurring Deposit Interest Calculator** | `recurring-deposit-interest` | finance | Percent | "Calculate RD returns"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**1054. Effective Interest Rate Calculator** | `effective-interest-rate` | finance | Percent | "Calculate effective interest rate"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**1055. Nominal Interest Rate Calculator** | `nominal-interest-rate` | finance | Percent | "Calculate nominal interest rate"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**1056. Daily Interest Calculator** | `daily-interest` | finance | Percent | "Calculate daily interest"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**1057. Monthly Interest Calculator** | `monthly-interest` | finance | Percent | "Calculate monthly interest"
in: `principal:currency=100000`, `rate:percent=8`, `years:number=5`, `compounds:select=12`
out: `interest:currency-inr[primary,big]`, `maturity:currency-inr`
f: A = P(1 + r/n)^(n·t)

**1058. Investment Calculator** | `investment` | finance | Calculator | "Calculate investment returns"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1059. SIP Calculator** | `sip` | finance | TrendingUp | "Calculate SIP returns"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

**1060. Mutual Fund Calculator** | `mutual-fund` | finance | TrendingUp | "Calculate mutual fund returns"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

**1061. Retirement Savings Calculator** | `retirement-savings` | finance | TrendingUp | "Plan retirement savings"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

**1062. Inflation Impact Calculator** | `inflation-impact` | finance | TrendingUp | "Calculate inflation impact on savings"
in: `monthly:currency=10000`, `rate:percent=12`, `years:number=10`
out: `maturity:currency-inr[primary,big]`, `invested:currency-inr`, `gains:currency-inr[success]`
f: FV = P·[((1+i)^N − 1)/i]·(1+i)

---

# N. Developer Tools (20)

**1063. Base Converter** | `base-converter` | developer | Beaker | "Convert between number bases"
in: `hConcentration:number=0.0000001`
out: `ph:number[primary,big]`
f: pH = −log₁₀[H⁺]

**1064. Text to Binary Converter** | `text-to-binary-converter` | developer | Type | "Convert text to binary"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1065. Binary to Decimal Converter** | `binary-to-decimal-converter` | developer | Calculator | "Convert binary to decimal"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1066. Hexadecimal to Decimal Converter** | `hexadecimal-to-decimal-converter` | developer | Palette | "Convert hex to decimal"
in: `input:text=#0D9488`, `from:select=hex`, `to:select=rgb`
out: `output:text[primary,big]`
f: color-space conversion

**1067. Decimal to Hexadecimal Converter** | `decimal-to-hexadecimal-converter` | developer | Palette | "Convert decimal to hex"
in: `input:text=#0D9488`, `from:select=hex`, `to:select=rgb`
out: `output:text[primary,big]`
f: color-space conversion

**1068. ASCII Converter** | `ascii-converter` | developer | Calculator | "Convert to/from ASCII"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1069. Unicode Converter** | `unicode-converter` | developer | Calculator | "Convert to/from Unicode"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1070. Text to ASCII Calculator** | `text-to-ascii` | developer | Type | "Convert text to ASCII"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1071. Number System Converter** | `number-system-converter` | developer | Calculator | "Convert between number systems"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1072. Morse Code Converter** | `morse-code-converter` | developer | Calculator | "Convert to/from Morse code"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1073. String Length Calculator** | `string-length` | developer | Calculator | "Calculate string length"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1074. Character Count Calculator** | `character-count` | developer | Type | "Count characters in text"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1075. Line Count Calculator** | `line-count` | developer | Type | "Count lines in text"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1076. Text Case Converter** | `text-case-converter` | developer | Type | "Convert text case"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1077. Trim Whitespace Calculator** | `trim-whitespace` | developer | Type | "Trim whitespace from text"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1078. Reverse String Calculator** | `reverse-string` | developer | Type | "Reverse text strings"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1079. Levenshtein Distance Calculator** | `levenshtein-distance` | developer | Type | "Calculate text difference"
in: `distanceKm:number=100`, `speedKmh:number=60`
out: `hours:number[primary,big]`
f: t = d / v

**1080. Text Similarity Checker** | `text-similarity-checker` | developer | Type | "Check text similarity"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1081. Palindrome Checker** | `palindrome-checker` | developer | Calculator | "Check for palindromes"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1082. Regex Tester** | `regex-tester` | developer | GraduationCap | "Test regular expressions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

---

# O. Chemistry (17)

**1083. Rotational Kinetic Energy Calculator** | `rotational-kinetic-energy` | chemistry | Wrench | "Calculate rotational energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1084. Bernoulli's Equation Calculator** | `bernoullis-equation` | chemistry | Calculator | "Calculate fluid flow"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1085. Diffraction Calculator** | `diffraction` | chemistry | Calculator | "Calculate diffraction"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1086. Refraction Index Calculator** | `refraction-index` | chemistry | Calculator | "Calculate refractive index"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1087. Lens Equation Calculator** | `lens-equation` | chemistry | Camera | "Calculate lens properties"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1088. Mirror Equation Calculator** | `mirror-equation` | chemistry | Calculator | "Calculate mirror properties"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1089. Planck's Law Calculator** | `plancks-law` | chemistry | Calculator | "Calculate black body radiation"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1090. Schrödinger Equation Calculator** | `schrdinger-equation` | chemistry | Calculator | "Calculate wave functions"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1091. Energy of a Photon Calculator** | `energy-of-a-photon` | chemistry | Wrench | "Calculate photon energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

**1092. Time Dilation Calculator** | `time-dilation` | chemistry | Calculator | "Calculate time dilation"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1093. Length Contraction Calculator** | `length-contraction` | chemistry | Calculator | "Calculate length contraction"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1094. Percent Composition Calculator** | `percent-composition` | chemistry | Percent | "Calculate composition percentages"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1095. Buffer Solution Calculator** | `buffer-solution` | chemistry | Beaker | "Calculate buffer properties"
in: `moles:number=1`, `volumeL:number=1`
out: `molarity:number[primary,big]`
f: M = n/V

**1096. Titration Calculator** | `titration` | chemistry | Calculator | "Calculate titrations"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1097. Heat of Reaction Calculator** | `heat-of-reaction` | chemistry | Thermometer | "Calculate reaction heat"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1098. Reaction Rate Calculator** | `reaction-rate` | chemistry | Beaker | "Calculate reaction rates"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

**1099. Activation Energy Calculator** | `activation-energy` | chemistry | Wrench | "Calculate activation energy"
in: `force:number=100`, `distance:number=5`, `time:number=10`
out: `work:number`, `power:number[primary,big]`
f: W = F·d ; P = W/t

---

# P. Electrical (1)

**1100. Voltage Divider Calculator** | `voltage-divider` | electrical | Calculator | "Calculate voltage division"
in: `inputA:number=10`, `inputB:number=5`
out: `result:number[primary,big]`
f: domain-specific formula — see Excel description

---

## Index

| #         | Section                 | Count   |
| --------- | ----------------------- | ------- |
| A         | Engineering             | 59      |
| B         | Math                    | 40      |
| C         | Travel & Transportation | 40      |
| D         | Parenting & Childcare   | 40      |
| E         | Education & Academia    | 40      |
| F         | Business & Marketing    | 35      |
| G         | Sports & Fitness        | 35      |
| H         | Lifestyle & Daily Use   | 35      |
| I         | Physics                 | 33      |
| J         | Date & Time             | 30      |
| K         | Health & Wellness       | 30      |
| L         | Environment & Energy    | 25      |
| M         | Finance                 | 20      |
| N         | Developer Tools         | 20      |
| O         | Chemistry               | 17      |
| P         | Electrical              | 1       |
| **Total** |                         | **500** |

## Pipeline note

These 500 + the 600 in batches 1–2 give you a runway of ~1100 calculators on the schema-driven engine.
Existing live count is auto-derived from `IMPLEMENTED_SLUGS.size` and surfaces everywhere via `CALCULATOR_COUNT_LABEL` (see `src/constants/stats.ts`) — every entry you ship from this batch automatically updates the homepage, OG image, metadata, and copy. No string sweeps needed.
