use std::ops::Mul;

use map_range::MapRange;

pub trait Tick {
  fn tick(&mut self, dt: f32);
}

#[derive(Debug, Clone, PartialEq)]
pub struct Reactor {
  pub control_rods: f32,
  pub energy: f32,
  pub temperature: f32,
  pub reactivity: f32,
}

impl Default for Reactor {
  fn default() -> Self {
    Self {
      control_rods: 100.0,
      energy: 0.0,
      temperature: 0.0,
      reactivity: 0.0,
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

    self.reactivity = (expected - self.energy) * 0.1;
    let speed = self.reactivity.abs().max(0.3) * dt;

    if (self.energy - expected).abs() > speed {
      self.energy += speed * (expected - self.energy).signum();
    } else {
      self.energy = expected;
    }
  }

  fn tick_temperature(&mut self, dt: f32) {
    let expected = self.energy.map_range(0.0..100.0, 0.0..412.0);

    let speed = (expected - self.temperature).mul(0.1).abs().max(2.5) * dt;

    if (self.temperature - expected).abs() > speed {
      self.temperature += speed * (expected - self.temperature).signum();
    } else {
      self.temperature = expected;
    }
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
