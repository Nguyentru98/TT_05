$("body").append(
  $("<div>", { class: "container  h1v df aic" }).append(
    $("<div>", { class: "content df bóng w1" })
      .css("height", "550px")
      .append(
        // cột menu
        $("<div>", {
          class: "menu col-md-3  df fdc aic bgsc bgrn bgpc",
        })
          .css({ backgroundImage: 'url("./assets/nen1.jpg")' })
          .append(
            $("<div>", { class: "cf fsi tac fs3 fwb pa25 " }).text("SUDOKU"),
            $("<div>", {
              class: "wh1 df fdc aic jcsa h50 cf mt50",
            }).append(
              $("<div>", {
                class: "btn btn-rule pa15 w70 tac bra15 fwb fs11 b1s cf",
              })
                .css("background-color", "rgb(0 0 0 / 50%)")
                .text("Luật Chơi"),
              $("<form>", {
                class: " w70 tac pa15 bra15 fwb fs11 df b1s",
              })
                .css("background-color", "rgb(0 0 0 / 50%)")
                .append(
                  $("<label>").text("Độ khó :"),
                  $("<select>", { class: "bn tac bgct fwb cf" }).append(
                    $("<option>")
                      .text("Dễ")
                      .css("background-color", "rgb(0 0 0 / 50%)"),
                    $("<option>")
                      .text("Trung bình")
                      .css("background-color", "rgb(0 0 0 / 50%)"),
                    $("<option>")
                      .text("Khó")
                      .css("background-color", "rgb(0 0 0 / 50%)")
                  )
                ),
              $("<div>", {
                class: " start btn pa15 w70 tac bra15 fwb fs11",
              })
                .css("background-color", "rgb(0 0 0 / 50%)")
                .text("Bắt Đầu")
            )
          ),
        // cột nội dung
        $("<div>", { class: "menu col-md-9 df h1 bgsc bgrn bgpc oh" })
          .css("background-image", "url('assets/nen2.jpg')")
          .append(
            // luật chơi
            $("<div>", { class: "rule wh1 dn pa pa25 bgcf" }).append(
              $("<div>", { class: "" }).append(
                $("<h1>", { class: "pa25 fs15" }).text(
                  "Luật chơi cơ bản của Sudoku"
                ),
                $("<li>").text(
                  "Sudoku là câu đố trí tuệ có hình dạng lưới gồm 9x9 ô trống."
                ),
                $("<li>").text("Bạn chỉ có thể sử dụng các số từ 1 đến 9."),
                $("<li>").text(
                  "Mỗi khối gồm 3×3 ô trống chỉ có thể chứa các số từ 1 đến 9."
                ),
                $("<li>").text(
                  "Mỗi hàng dọc chỉ có thể chứa các số từ 1 đến 9."
                ),
                $("<li>").text(
                  "Mỗi hàng ngang chỉ có thể chứa các số từ 1 đến 9."
                ),
                $("<li>").text(
                  "Mỗi số trong khối 3×3, hàng dọc hoặc hàng ngang không được trùng nhau."
                ),
                $("<li>").text(
                  "Câu đố được giải khi điền đúng hết tất cả các số trên toàn bộ lưới Sudoku."
                )
              ),
              $("<div>", { class: "" }).append(
                $("<li>").text(
                  "Sử dụng gợi ý bằng những số điền sẵn và bàn phím để điền những số còn lại:"
                ),
                $("<div>", { class: "df jcsc mt25" }).append(
                  $("<img>", { class: "h200" }).attr(
                    "src",
                    "assets/bangSdk.png"
                  ),
                  $("<img>", { class: "h200" }).attr(
                    "src",
                    "assets/keyboard.png"
                  )
                )
              )
            ),
            // nội dung sudoku
            $("<div>", { class: "game-content dn pa df wh1 pa25 jcsc" })
              .css(
                "background-image",
                "linear-gradient(rgba(17, 17, 17, 0.5), rgba(130, 121, 121, 0.5))"
              )
              .append(
                $("<div>", { class: "sudoku-main " }).append(
                  // icon
                  $("<div>", { class: " ptb25 tar cf df jcfe" }).append(
                    $("<audio>", {
                      class: "audioPlayer",
                    }).append(
                      $("<source>").attr({
                        src: "assets/Nhac-Thien-Tinh-Tam-VA.mp3",
                        type: "audio/mp3",
                      })
                    ),
                    $("<i>", {
                      class: "fa-solid fa-volume-low  plr10 fs15",
                    }),
                    $("<i>", {
                      class: "fa-solid fa-volume-xmark dn plr10 fs15",
                    }),
                    $("<i>", {
                      class: "fa-solid fa-play plr10 dn fs15",
                    }),
                    $("<i>", {
                      class: "fa-solid fa-pause plr10 fs15",
                    }),
                    $("<span>", { class: "time" })
                  ),
                  $("<div>", { class: "df jcsc" }).append(
                    // sudoku table
                    $("<div>", { class: " w50 pr" }).append(
                      $("<div>", { class: "taobang" }),
                      $("<div>", { class: "continue wh1 dn" }).append(
                        $("<div>", {
                          class: "pa df jcsc aic wh1 bgcod",
                        }).append(
                          $("<div>", {
                            class:
                              "btn btn-continue pa15 w70 tac bra15 fwb fs11 b1s cf",
                          })
                            .css("background-color", "rgb(0 0 0 / 50%)")
                            .text("Tiếp tục")
                        )
                      )
                    ),
                    // keyboard,
                    $("<div>", { class: "w30 df pl25" }).append(
                      $("<div>", { class: "bóng b1s h1 df fdc jcsc" })
                        .css("background-color", "rgba(225,225,225,0.3)")
                        .append(
                          $("<div>", {
                            class: " cf w1 tac ptb15 fs13",
                          }).text("Keyboard"),
                          $("<div>", {
                            class: "w1 df fww",
                          }).append(
                            $.map([1, 2, 3, 4, 5, 6, 7, 8, 9], function (el) {
                              return $("<div>", {
                                class: "  w33 df jcsc ptb15 btn",
                              }).append(
                                $("<div>", {
                                  class:
                                    "btnKeyboard btn pa25 w33 h30 bra15 df jcsc aic bgcf fs15 fwb",
                                })
                                  .append(el)
                                  .attr("data-value", el)
                              );
                            }),
                            // chơi lai
                            $("<div>", {
                              class: "df w1 jcsa ptb25",
                            }).append(
                              $("<div>", {
                                class:
                                  "btn play-again pa25 h30 bra15 df jcsc aic bgcf fwb ",
                              })
                                .css("background-color", "#ffff")
                                .text("Chơi Lại"),
                              $("<i>", {
                                class:
                                  "fa-solid fa-xmark w33 pa25 h30 bra15 df jcsc aic bgcf fs15 fwb btn remove",
                              }).attr("data-value", null)
                            )
                          )
                        )
                    )
                  )
                )
              )
          )
      )
  )
);
