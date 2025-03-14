use map_range::MapRange;
use wasm_bindgen::prelude::*;

pub trait Tick {
  fn tick(&mut self) {}
}

#[wasm_bindgen]
#[derive(Debug, Clone, PartialEq)]
pub struct Reactor {
  control_rods: f32,
  temp: f32,
}

impl Default for Reactor {
  fn default() -> Self {
    Self {
      control_rods: 100.0,
      temp: 0.0,
    }
  }
}

impl Tick for Reactor {
  fn tick(&mut self) {
    self.temp = self.control_rods.map_range(100.0..90.0, 0.0..400.0)
  }
}

#[wasm_bindgen]
impl Reactor {
  pub fn control_rods(&self) -> f32 {
    self.control_rods
  }

  pub fn control_rods_mut(&mut self, control_rods: f32) {
    self.control_rods = control_rods;
  }

  pub fn temp(&self) -> f32 {
    self.temp
  }
}

#[wasm_bindgen]
#[derive(Debug, Clone, PartialEq, Default)]
pub struct Game {
  reactor: Reactor,
}

#[wasm_bindgen]
impl Game {
  #[wasm_bindgen(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  pub fn tick(&mut self) {
    self.reactor.tick();
  }

  pub fn reactor(&self) -> Reactor {
    self.reactor.clone()
  }

  pub fn set_control_rods(&mut self, control_rods: f32) {
    self.reactor.control_rods_mut(control_rods);
  }

  pub fn set_control_rods_delta(&mut self, delta: f32) {
    self
      .reactor
      .control_rods_mut(self.reactor.control_rods() + delta);
  }
}
