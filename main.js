"use strict";
const VALID_TYPES = [
    "leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"
];
const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;
function printUsage() {
    console.log("=== triangle() — Right Triangle Solver ===");
    console.log("Usage: triangle(value1, type1, value2, type2)");
    console.log("Valid types:");
    console.log('  "leg"            — a leg (cathetus)');
    console.log('  "hypotenuse"     — the hypotenuse');
    console.log('  "adjacent angle" — angle adjacent to the leg (degrees)');
    console.log('  "opposite angle" — angle opposite to the leg (degrees)');
    console.log('  "angle"          — acute angle when hypotenuse is given (degrees)');
    console.log("Examples:");
    console.log('  triangle(4, "leg", 8, "hypotenuse")');
    console.log('  triangle(60, "opposite angle", 5, "leg")');
    console.log("==========================================");
}
function triangle(val1, type1, val2, type2) {
    // Validate type strings
    if (!VALID_TYPES.includes(type1) ||
        !VALID_TYPES.includes(type2)) {
        console.log("Invalid type(s). Please re-read the instructions.");
        return "failed";
    }
    const t1 = type1;
    const t2 = type2;
    // Validate positive non-zero values
    if (val1 <= 0 || val2 <= 0) {
        return "Zero or negative input";
    }
    // Validate angle ranges
    const angleTypes = ["adjacent angle", "opposite angle", "angle"];
    if (angleTypes.includes(t1) && val1 >= 90) {
        return "Angle must be strictly between 0° and 90°";
    }
    if (angleTypes.includes(t2) && val2 >= 90) {
        return "Angle must be strictly between 0° and 90°";
    }
    // Incompatible pairs: two angles without a side
    if (angleTypes.includes(t1) && angleTypes.includes(t2)) {
        console.log("Incompatible pair of types. Please re-read the instructions.");
        return "failed";
    }
    // "angle" only valid with "leg" or "hypotenuse"
    if ((t1 === "angle" && t2 !== "leg" && t2 !== "hypotenuse") ||
        (t2 === "angle" && t1 !== "leg" && t1 !== "hypotenuse")) {
        console.log("Incompatible pair of types. Please re-read the instructions.");
        return "failed";
    }
    // Two identical non-leg types
    if (t1 === t2 && t1 !== "leg") {
        console.log("Incompatible pair of types. Please re-read the instructions.");
        return "failed";
    }
    let a = 0, b = 0, c = 0;
    let alpha = 0, beta = 0;
    // Resolve a canonical helper to get value by type
    const get = (t) => (t === t1 ? val1 : val2);
    if (t1 === "leg" && t2 === "leg") {
        // Two legs
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = toDeg(Math.atan(b / a));
    }
    else if ((t1 === "leg" && t2 === "hypotenuse") || (t1 === "hypotenuse" && t2 === "leg")) {
        // Leg + hypotenuse
        a = t1 === "leg" ? val1 : val2;
        c = t1 === "hypotenuse" ? val1 : val2;
        if (a >= c)
            return "Leg must be shorter than hypotenuse";
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }
    else if ((t1 === "leg" && t2 === "opposite angle") ||
        (t1 === "opposite angle" && t2 === "leg")) {
        // Leg a + its opposite angle alpha
        a = t1 === "leg" ? val1 : val2;
        alpha = t1 === "opposite angle" ? val1 : val2;
        beta = 90 - alpha;
        c = a / Math.sin(toRad(alpha));
        b = c * Math.cos(toRad(alpha));
    }
    else if ((t1 === "leg" && t2 === "adjacent angle") ||
        (t1 === "adjacent angle" && t2 === "leg")) {
        // Leg a + angle adjacent to it (= beta, opposite to b)
        a = t1 === "leg" ? val1 : val2;
        beta = t1 === "adjacent angle" ? val1 : val2;
        alpha = 90 - beta;
        c = a / Math.sin(toRad(alpha));
        b = c * Math.sin(toRad(beta));
    }
    else if ((t1 === "hypotenuse" && t2 === "angle") ||
        (t1 === "angle" && t2 === "hypotenuse")) {
        // Hypotenuse + one acute angle
        c = t1 === "hypotenuse" ? val1 : val2;
        alpha = t1 === "angle" ? val1 : val2;
        beta = 90 - alpha;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.sin(toRad(beta));
    }
    else if ((t1 === "hypotenuse" && t2 === "opposite angle") ||
        (t1 === "opposite angle" && t2 === "hypotenuse")) {
        c = t1 === "hypotenuse" ? val1 : val2;
        alpha = t1 === "opposite angle" ? val1 : val2;
        beta = 90 - alpha;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.sin(toRad(beta));
    }
    else if ((t1 === "hypotenuse" && t2 === "adjacent angle") ||
        (t1 === "adjacent angle" && t2 === "hypotenuse")) {
        c = t1 === "hypotenuse" ? val1 : val2;
        beta = t1 === "adjacent angle" ? val1 : val2;
        alpha = 90 - beta;
        a = c * Math.sin(toRad(alpha));
        b = c * Math.sin(toRad(beta));
    }
    else {
        console.log("Incompatible pair of types. Please re-read the instructions.");
        return "failed";
    }
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);
    return "success";
}
printUsage();
