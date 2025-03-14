use chrono::Duration;
use leptos::prelude::*;

pub fn use_acceleration(
  base_increment: f32,
  timeout_ms: Duration,
) -> impl Fn() -> f32 {
  let (last_time, set_last_time) = signal(chrono::Local::now());

  move || {
    let now = chrono::Local::now();
    let diff = now - last_time.get();

    set_last_time.set(now);

    if diff > timeout_ms || diff < Duration::milliseconds(1) {
      base_increment
    } else {
      (timeout_ms.num_milliseconds() as f32 / diff.num_milliseconds() as f32)
        .powf(2.0)
        * base_increment
    }
  }
}
