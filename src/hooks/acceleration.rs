use leptos::prelude::*;
use leptos_use::use_timestamp;

pub fn use_acceleration(
  base_increment: f64,
  timeout_ms: f64,
) -> impl Fn() -> f64 {
  let timestamp = use_timestamp();
  let (last_time, set_last_time) = signal(timestamp.get());

  move || {
    let now = timestamp.get();
    let diff = now - last_time.get();
    let diff = diff * 1000.0;

    set_last_time.set(now);

    if diff > timeout_ms || diff < 1.0 {
      base_increment
    } else {
      (timeout_ms / diff as f64).powi(2) * base_increment
    }
  }
}
