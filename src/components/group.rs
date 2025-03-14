use leptos::prelude::*;

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Direction {
  Row,
  Column,
}

impl core::fmt::Display for Direction {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match self {
      Self::Row => write!(f, "row"),
      Self::Column => write!(f, "column"),
    }
  }
}

#[component]
pub fn Group(
  direction: Direction,
  #[prop(optional)] no_pad: Option<bool>,
  #[prop(optional)] no_gap: Option<bool>,
  children: Children,
) -> impl IntoView {
  let class_name = format!(
    "group {} {} {}",
    direction,
    if no_pad.unwrap_or(false) {
      "no-pad"
    } else {
      ""
    },
    if no_gap.unwrap_or(false) {
      "no-gap"
    } else {
      ""
    }
  );

  view! {
    <div class=class_name>
      {children()}
    </div>
  }
}
