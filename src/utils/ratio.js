// Helper function to calculate GCD (Greatest Common Divisor)
function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

// Function to reduce the ratio to its simplest form
function simplifyRatio(numerator, denominator) {
    const divisor = gcd(numerator, denominator);
    return `${numerator / divisor}:${denominator / divisor}`;
}

export default simplifyRatio