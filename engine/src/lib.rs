use serde::{Deserialize, Serialize};
use ts_rs::TS;
use wasm_bindgen::prelude::*;

#[derive(TS, Serialize, Deserialize)]
#[ts(export)]
#[serde(rename_all = "kebab-case")]
struct User {
  user_id: i32,
  first_name: String,
  last_name: String,
}

#[wasm_bindgen]
extern "C" {
  pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  alert(&format!("Hello, {}!", name));
}
