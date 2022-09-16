use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct MyStruct {

    #[serde(alias = "mySuperCoolId")]
    my_super_cool_id: usize,

    #[serde(alias = "someEventThingHere")]
    some_event_thing_here: Vec<String>,

    #[serde(alias = "mySessionId")]
    my_session_id: String,

    #[serde(alias = "pen15SessionId")]
    pen15_session_id: String,

    #[serde(alias = "generatedSessionTokenId")]
    generated_session_token_id: String,

    #[serde(alias = "digestTheseStrings")]
    digest_these_strings: String,

    #[serde(alias = "vimId")]
    vim_id: usize,

    #[serde(alias = "buildId")]
    build_id: usize,

    #[serde(alias = "anotherNumber")]
    another_number: usize,

    time: usize,
    r#type: Vec<String>,
}


fn main() {

    if true {
        println!("oeuntoeunthoeunth");
    } else {
        println!("Goodbye, world!");
    }

}
