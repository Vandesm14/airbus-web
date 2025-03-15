use leptos::prelude::*;

#[derive(Debug, Clone, Copy, Default)]
pub enum Kind {
  #[default]
  IndicateOn,
  IndicateOff,
}

impl core::fmt::Display for Kind {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match self {
      Self::IndicateOn => write!(f, "on"),
      Self::IndicateOff => write!(f, "off"),
    }
  }
}

#[derive(Debug, Clone, Copy, Default)]
pub enum Top {
  #[default]
  None,

  Avail,
  Fault,
}

impl core::fmt::Display for Top {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match self {
      Self::None => write!(f, ""),
      Self::Avail => write!(f, "avail"),
      Self::Fault => write!(f, "fault"),
    }
  }
}

#[component]
pub fn Button(
  #[prop(optional)] kind: Kind,

  top: impl Get<Value = Top> + 'static + Copy,
  on: impl Get<Value = bool> + 'static + Copy,
  // This is used within the view! macro
  #[allow(unused_variables)] on_click: Callback<()>,
) -> impl IntoView {
  let on_click = move |_| {};

  let top_class = move || format!("top {}", top.get());
  let top_text = move || top.get().to_string().to_uppercase();

  let bottom_text = move || match kind {
    Kind::IndicateOn => match on.get() {
      true => "ON",
      false => "",
    },
    Kind::IndicateOff => match !on.get() {
      true => "OFF",
      false => "",
    },
  };
  let bottom_class = move || {
    format!(
      "bottom {}",
      match kind {
        Kind::IndicateOn => "blue",
        Kind::IndicateOff => "white",
      }
    )
  };

  view! {
    <div class="btn">
      <button class="inner" on:mousedown={on_click}>
        <span class=top_class()>{top_text()}</span>
        <span class=bottom_class()>{bottom_text()}</span>
      </button>
    </div>
  }
}
