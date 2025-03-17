use airbus_web::{
  components::{
    button::{Button, Kind, Top},
    encoder::Encoder,
    group::{Direction, Group},
    seven_segment::SevenSegment,
    with_label::WithLabel,
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
  let reactivity =
    Signal::derive(move || format!("{:.2}", engine.get().reactor.reactivity));
  let temperature =
    Signal::derive(move || format!("{:.1}", engine.get().reactor.temperature));

  let scram = Signal::derive(move || engine.get().reactor.scram);

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

  let toggle_button = Callback::new(move |_| {
    set_engine.update(|e| e.reactor.scram = !e.reactor.scram);
  });

  return view! {
    <Group direction=Direction::Row>
      <Group direction=Direction::Column>
        <WithLabel label="REACTIVITY".into()>
          <SevenSegment value=reactivity digits=4 />
        </WithLabel>
        <WithLabel label="TEMP".into()>
          <SevenSegment value=temperature digits=5 />
        </WithLabel>
        <WithLabel label="RODS".into()>
          <SevenSegment value=control_rods digits=4 />
          <Group direction=Direction::Row>
            <WithLabel label="CTRL".into()>
              <Encoder on_change=Callback::new(change) />
            </WithLabel>
            <WithLabel label="SCRAM".into()>
              <Button on=scram on_click=toggle_button top=Top::None kind=Kind::IndicateOn />
            </WithLabel>
          </Group>
        </WithLabel>
      </Group>
    </Group>
  };
}

fn main() {
  console_error_panic_hook::set_once();
  leptos::mount::mount_to_body(|| view! { <App /> })
}
