use leptos::prelude::*;

use crate::components::label::Label;

#[component]
pub fn WithLabel(label: String, children: Children) -> impl IntoView {
  view! {
    <div class="with-label">
      <Label text=label />
      {children()}
    </div>
  }
}
