use airbus_web::{
  components::{
    button::{Button, Top},
    encoder::Encoder,
    group::{Direction, Group},
    seven_segment::SevenSegment,
  },
  engine::{Engine, Tick},
};
use chrono::Duration;
use leptos::{logging, prelude::*};

const TICK_RATE: f32 = 1000.0 / 30.0;

#[component]
fn App() -> impl IntoView {
  let (last, set_last) = signal(chrono::Local::now());
  let (engine, set_engine) = signal(Engine::default());
  // let acceleration = use_acceleration(0.1, Duration::milliseconds(100));

  let change = move |direction: i32| {
    let accel = direction as f32 * 0.1;
    set_engine.update(|e| {
      e.reactor.control_rods =
        ((e.reactor.control_rods + accel) * 10.0).round() / 10.0;
      e.reactor.control_rods = e.reactor.control_rods.clamp(0.0, 100.0);
    });
  };

  let control_rods =
    Signal::derive(move || format!("{:.1}", engine.get().reactor.control_rods));
  let energy =
    Signal::derive(move || format!("{:.1}", engine.get().reactor.energy));
  let temperature =
    Signal::derive(move || format!("{:.1}", engine.get().reactor.temperature));

  set_interval(
    move || {
      let now = chrono::Local::now();
      if now - last.get() >= Duration::milliseconds(TICK_RATE as i64) {
        let dt = (now - last.get()).num_milliseconds() as f32 / 1000.0;
        set_engine.update(|e| e.tick(dt));

        set_last.set(now);
      }
    },
    core::time::Duration::from_millis(TICK_RATE as u64),
  );

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
        <SevenSegment value=energy digits=4 />
        <SevenSegment value=temperature digits=5 />
        <SevenSegment value=control_rods digits=4 />
        <Encoder on_change=Callback::new(change) />
      </Group>
    </Group>
  };
}

fn main() {
  console_error_panic_hook::set_once();
  leptos::mount::mount_to_body(|| view! { <App /> })
}
