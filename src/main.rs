use actix_cors::Cors;
use actix_web::{post, web, App, HttpResponse, HttpServer, Responder, get,};
use serde::Deserialize;


fn handle_user(user: &str, password: &str) -> impl Responder {
    let user_bytes = user.as_bytes();
    let password_bytes = password.as_bytes();

    if (user == "user1" && password == "1234") || (user == "user2" && password == "1234") {
        println!("User: {} is correct!", user);
        HttpResponse::Ok().body("User correct!")
    } else {
        println!("User: {} failed!", user);
        println!("password {} failed", password);
        println!("User bytes: {:?}", user_bytes);
        println!("Password bytes: {:?}", password_bytes);
        HttpResponse::Unauthorized().body("Error in the username or password")
    }
}

#[derive(Deserialize)]
struct UserStruct {
    password: String,
    user: String,
}

#[post("/response_to_user")]
async fn response_to_user(req_body: web::Json<UserStruct>) -> impl Responder {
    let user = &req_body.user;
    println!("username {}", user);
    let password = &req_body.password;
    println!("password {}", password);
    handle_user(&user, &password)
}

#[derive(Deserialize)]
struct CreditCard {
    credit_card: i128,
}

fn reverse_digits(mut n: i128) -> i128 {
    let mut reversed = 0;
    while n != 0 {
        let digit = n % 10;
        reversed = reversed * 10 + digit;
        n /= 10;
    }
    reversed
}

fn luhn_algorithm(creditcard: i128) -> bool {
    let mut credit_card_reversed = reverse_digits(creditcard);
    let mut sum = 0;
    let mut is_even = false;

    while credit_card_reversed > 0 {
        let digit = credit_card_reversed % 10;
        credit_card_reversed /= 10;

        if is_even {
            let doubled = digit * 2;
            sum += if doubled > 9 { doubled - 9 } else { doubled };
        } else {
            sum += digit;
        }

        is_even = !is_even;
    }

    let pass_card = sum % 10 == 0;
    pass_card
}

#[post("/credit-card")]
async fn credit_card_checker(req_body: web::Json<CreditCard>) -> impl Responder {
    let credit_card_complete = &req_body.credit_card;
    println!("credit card recieved!! : {}", credit_card_complete);
    if luhn_algorithm((*credit_card_complete).try_into().unwrap()) {
        HttpResponse::Ok()
    } else {
        HttpResponse::Unauthorized()
    }

}

// struct for the chat // 


static mut LATEST_MSG: Option<String> = None;

#[derive(Deserialize)]
struct MessageChat {
    message: String
}


#[post("/send-message-user")]
async fn send_message_user(req_body: web::Json<MessageChat>) -> impl Responder {
    let recieve_message = &req_body.message;
    unsafe {
        LATEST_MSG = Some(recieve_message.clone())
    }
    HttpResponse::Ok() 
}

#[get("/distribution-message")]
async fn dis_msg() -> impl Responder {
  let message = unsafe {LATEST_MSG.clone()};
  match message {
      Some(msg) => HttpResponse::Ok().body(msg),
      None => HttpResponse::NotFound().body("No messages")
  }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .service(response_to_user)
            .service(credit_card_checker)
            .service(send_message_user)
            .service(dis_msg)
    })
    .bind(("127.0.0.1", 9999))?
    .run()
    .await
}
