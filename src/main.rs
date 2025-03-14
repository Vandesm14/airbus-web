use airbus_web::{
  components::{
    encoder::Encoder,
    group::{Direction, Group},
    seven_segment::SevenSegment,
  },
  hooks::acceleration::use_acceleration,
};
use chrono::Duration;
use leptos::prelude::*;

#[component]
fn App() -> impl IntoView {
  let (value, set_value) = signal(0.0_f32);
  let acceleration = use_acceleration(0.1, Duration::milliseconds(100));

  let change = move |direction: i32| {
    let accel = acceleration() * direction as f32;
    set_value.update(|v| {
      *v += accel;
      *v = (*v * 10.0).round() / 10.0;
    });
  };

  let fixed_value = Memo::new(move |_| format!("{:.1}", value.get()));

  return view! {
    <Group direction={Direction::Column}>
      <SevenSegment value={fixed_value} digits=4 />
      <Encoder on_change={Callback::new(change)} />
    </Group>
  };
}

fn main() {
  console_error_panic_hook::set_once();
  leptos::mount::mount_to_body(|| view! { <App /> })
}
