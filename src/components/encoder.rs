use leptos::prelude::*;

#[component]
pub fn Encoder(
  #[prop(optional)] on_change: Option<Callback<i32>>,
  #[prop(optional)] on_increment: Option<Callback<()>>,
  #[prop(optional)] on_decrement: Option<Callback<()>>,
) -> impl IntoView {
  let (value, set_value) = signal(0);

  let on_scroll = move |ev: web_sys::WheelEvent| {
    ev.prevent_default();

    let delta = ev.delta_y();
    let direction = if delta < 0.0 { 1 } else { -1 };

    if let Some(callback) = &on_change {
      callback.run(direction);
    }

    set_value.update(|v| *v += direction * 16);

    if direction == 1 {
      if let Some(incr) = &on_increment {
        incr.run(());
      }
    } else if direction == -1 {
      if let Some(decr) = &on_decrement {
        decr.run(());
      }
    }
  };

  let transform_style =
    move || format!("transform: rotate({:?}deg);", value.as_borrowed());

  view! {
    <div class="encoder-outer">
      <div class="encoder" on:wheel=on_scroll style=transform_style />
    </div>
  }
}
