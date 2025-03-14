use airbus_web::{
  components::encoder::Encoder, hooks::acceleration::use_acceleration,
};
use leptos::prelude::*;

#[component]
fn App() -> impl IntoView {
  let acceleration = use_acceleration(0.1, 100.0);

  let change = move |direction: i32| {
    println!("accel: {:?}", acceleration());
  };

  return view! {
    <Encoder on_change={Callback::new(change)} />
  };
}

fn main() {
  console_error_panic_hook::set_once();
  leptos::mount::mount_to_body(|| view! { <App /> })
}
