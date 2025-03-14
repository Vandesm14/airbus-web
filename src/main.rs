use airbus_web::{
  components::{
    encoder::Encoder,
    group::{Direction, Group},
  },
  hooks::acceleration::use_acceleration,
};
use chrono::Duration;
use leptos::prelude::*;

#[component]
fn App() -> impl IntoView {
  let acceleration = use_acceleration(0.1, Duration::milliseconds(100));

  let change = move |direction: i32| {
    println!("accel: {:?}", acceleration());
  };

  return view! {
    <Group direction={Direction::Column}>
      <Encoder on_change={Callback::new(change)} />
    </Group>
  };
}

fn main() {
  console_error_panic_hook::set_once();
  leptos::mount::mount_to_body(|| view! { <App /> })
}
