/**
 * Función creada por IA para animar botones usando una simulación de resorte.
 * @param {HTMLElement} element - The element to be animated.
 * @param {string} property - The CSS transform property to apply (e.g., "scale").
 * @param {number} from - Starting value.
 * @param {number} to - Target value.
 * @param {Object} options - Spring parameters.
 */
export function animateSpring(element, property, from, to, options = {}) {
  let current = from;
  let velocity = 0;
  // Default spring parameters (tweak these to change the feel):
  const stiffness = options.stiffness || 200; // spring stiffness
  const damping = options.damping || 15; // damping factor
  const mass = options.mass || 1; // mass (affects acceleration)
  const threshold = options.threshold || 0.001; // when to stop the animation

  const dt = 1 / 60; // approximate time step (60fps)

  function update() {
    // Calculate the spring force: F = -stiffness * (current - to)
    const springForce = -stiffness * (current - to);
    // Calculate the damping force: F = -damping * velocity
    const dampingForce = -damping * velocity;
    // Sum forces to get acceleration: F = ma, so a = F / m
    const acceleration = (springForce + dampingForce) / mass;

    // Update velocity and current value with simple Euler integration
    velocity += acceleration * dt;
    current += velocity * dt;

    // Apply the new scale value using transform (for example, scale)
    element.style.transform = `${property}(${current.toFixed(3)})`;

    // Stop if the change is below a small threshold
    if (Math.abs(current - to) > threshold || Math.abs(velocity) > threshold) {
      requestAnimationFrame(update);
    } else {
      // Ensure final value is set
      element.style.transform = `${property}(${to})`;
    }
  }

  requestAnimationFrame(update);
}
