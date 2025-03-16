use map_range::MapRange;

pub trait Tick {
  fn tick(&mut self, dt: f32);
}

#[derive(Debug, Clone, PartialEq)]
pub struct Reactor {
  pub control_rods: f32,
  pub energy: f32,
  pub temperature: f32,
}

impl Default for Reactor {
  fn default() -> Self {
    Self {
      control_rods: 100.0,
      energy: 0.0,
      temperature: 0.0,
    }
  }
}

impl Tick for Reactor {
  fn tick(&mut self, dt: f32) {
    self.tick_energy(dt);
    self.tick_temperature(dt);
  }
}

impl Reactor {
  fn tick_energy(&mut self, dt: f32) {
    let expected = self.control_rods.map_range(100.0..90.0, 0.0..100.0);
    let speed = if self.energy < expected {
      0.3 * dt
    } else {
      2.0 * dt
    };
    if (self.energy - expected).abs() > speed {
      self.energy += speed * (expected - self.energy).signum();
    } else {
      self.energy = expected;
    }
  }

  fn tick_temperature(&mut self, dt: f32) {
    let speed = 2.5 * dt;
    let expected = self.energy.map_range(0.0..100.0, 0.0..412.0);
    if (self.temperature - expected).abs() > speed {
      self.temperature += speed * (expected - self.temperature).signum();
    } else {
      self.temperature = expected;
    }
  }
}

impl Reactor {
  pub fn control_rods(&self) -> f32 {
    self.control_rods
  }

  pub fn control_rods_mut(&mut self, control_rods: f32) {
    self.control_rods = control_rods;
  }

  pub fn temp(&self) -> f32 {
    self.energy
  }
}

#[derive(Debug, Clone, PartialEq, Default)]
pub struct Engine {
  pub reactor: Reactor,
}

impl Tick for Engine {
  fn tick(&mut self, dt: f32) {
    self.reactor.tick(dt);
  }
}
