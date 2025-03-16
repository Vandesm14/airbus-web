use leptos::prelude::*;

#[component]
pub fn Label(
  text: String,
  #[prop(optional)] on_click: Option<Callback<()>>,
) -> impl IntoView {
  let clickable = move || on_click.is_some();

  let handle_click = move |_| {
    if let Some(on_click) = on_click {
      on_click.run(());
    }
  };

  let lines =
    move || text.split('\n').map(|x| x.to_owned()).collect::<Vec<_>>();

  view! {
    <span class:label class:clickable=clickable on:click=handle_click>
      <For each=move || lines() key=|state| state.clone() let(child)>
        <p>{child}</p>
      </For>
    </span>
  }
}
