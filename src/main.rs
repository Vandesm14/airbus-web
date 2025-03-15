use airbus_web::{
  components::{
    button::{Button, Top},
    encoder::Encoder,
    group::{Direction, Group},
    seven_segment::SevenSegment,
  },
  hooks::acceleration::use_acceleration,
};
use chrono::Duration;
use leptos::{logging, prelude::*};

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

  let (button, set_button) = signal(false);
  let toggle_button = Callback::new(move |_| {
    logging::log!("click");
    set_button.update(|b| *b = !*b)
  });

  let top = Signal::derive(move || match button.get() {
    true => Top::Avail,
    false => Top::None,
  });

  return view! {
    <Group direction=Direction::Row>
      <Group direction=Direction::Column>
        <Button on=button on_click=toggle_button top=top />
      </Group>
      <Group direction=Direction::Column>
        <SevenSegment value=fixed_value digits=4 />
        <Encoder on_change=Callback::new(change) />
      </Group>
    </Group>
  };
}

fn main() {
  console_error_panic_hook::set_once();
  leptos::mount::mount_to_body(|| view! { <App /> })
}
