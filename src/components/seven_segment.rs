use leptos::{html::Canvas, prelude::*};
use web_sys::{CanvasRenderingContext2d, wasm_bindgen::JsCast};

#[derive(Clone, Copy)]
struct Segments {
  a: bool,
  b: bool,
  c: bool,
  d: bool,
  e: bool,
  f: bool,
  g: bool,
}

impl Segments {
  fn null_segments() -> Self {
    Self {
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false,
    }
  }

  fn digit_to_segment(digit: i32) -> Self {
    Self {
      a: matches!(digit, 0 | 2 | 3 | 5 | 6 | 7 | 8 | 9),
      b: matches!(digit, 0 | 1 | 2 | 3 | 4 | 7 | 8 | 9),
      c: matches!(digit, 0 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9),
      d: matches!(digit, 0 | 2 | 3 | 5 | 6 | 8 | 9),
      e: matches!(digit, 0 | 2 | 6 | 8),
      f: matches!(digit, 0 | 4 | 5 | 6 | 8 | 9),
      g: matches!(digit, -1 | 2 | 3 | 4 | 5 | 6 | 8 | 9),
    }
  }
}

const ON_COLOR: &str = "#f00";
const OFF_COLOR: &str = "#300";

#[component]
pub fn SevenSegment(
  value: impl Get<Value = String> + 'static,
  #[prop(optional)] digits: Option<usize>,
) -> impl IntoView {
  let canvas_ref = NodeRef::<Canvas>::new();

  let size = 6.0;
  let ratio = 4.0;
  let padding = size * 1.5;

  Effect::new(move || {
    let canvas = canvas_ref.get().unwrap();
    let ctx = canvas
      .get_context("2d")
      .unwrap()
      .unwrap()
      .dyn_into::<CanvasRenderingContext2d>()
      .unwrap();

    ctx.clear_rect(0.0, 0.0, canvas.width() as f64, canvas.height() as f64);
    ctx.set_fill_style_str("black");
    ctx.fill_rect(0.0, 0.0, canvas.width() as f64, canvas.height() as f64);

    let string = value.get().to_string();
    let decimal_index = string
      .chars()
      .rev()
      .enumerate()
      .find(|ci| ci.1 == '.')
      .map(|ci| ci.0);
    let string: String = string.chars().filter(|c| *c != '.').collect();

    let digits = digits.unwrap_or(1);
    let calc_offset =
      |i: usize| (size * 2.0 + size * ratio + padding) * i as f64;

    for i in 0..digits {
      let i_from_end = digits - i - 1;
      let offset = calc_offset(i);

      let segments = if let Some(char) = string.chars().rev().nth(i_from_end) {
        Segments::digit_to_segment(if char == '-' {
          -1
        } else {
          char.to_digit(10).unwrap_or(0) as i32
        })
      } else {
        Segments::null_segments()
      };

      ctx.set_fill_style_str(if segments.a { ON_COLOR } else { OFF_COLOR });
      ctx.fill_rect(offset + padding + size, padding, size * ratio, size);

      ctx.set_fill_style_str(if segments.b { ON_COLOR } else { OFF_COLOR });
      ctx.fill_rect(
        offset + padding + size + size * ratio,
        padding + size,
        size,
        size * ratio,
      );

      ctx.set_fill_style_str(if segments.c { ON_COLOR } else { OFF_COLOR });
      ctx.fill_rect(
        offset + padding + size + size * ratio,
        padding + size * 2.0 + size * ratio,
        size,
        size * ratio,
      );

      ctx.set_fill_style_str(if segments.d { ON_COLOR } else { OFF_COLOR });
      ctx.fill_rect(
        offset + padding + size,
        padding + size * 2.0 + size * ratio * 2.0,
        size * ratio,
        size,
      );

      ctx.set_fill_style_str(if segments.e { ON_COLOR } else { OFF_COLOR });
      ctx.fill_rect(
        offset + padding,
        padding + size * 2.0 + size * ratio,
        size,
        size * ratio,
      );

      ctx.set_fill_style_str(if segments.f { ON_COLOR } else { OFF_COLOR });
      ctx.fill_rect(offset + padding, padding + size, size, size * ratio);

      ctx.set_fill_style_str(if segments.g { ON_COLOR } else { OFF_COLOR });
      ctx.fill_rect(
        offset + padding + size,
        padding + size + size * ratio,
        size * ratio,
        size,
      );
    }

    if let Some(decimal_index) = decimal_index {
      let offset = calc_offset(digits - decimal_index - 1);
      ctx.set_fill_style_str(ON_COLOR);
      ctx.fill_rect(
        padding + offset + size * ratio + size * 2.25,
        padding + size * 2.0 + size * ratio * 2.0,
        size,
        size,
      );
    }
  });

  view! {
    <canvas
      node_ref=canvas_ref
      width={(size * 2.0 + size * ratio + padding) * digits.unwrap_or(1) as f64 + padding}
      height={size * 3.0 + size * ratio * 2.0 + padding * 2.0}
    />
  }
}
