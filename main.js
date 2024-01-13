// tạo bảng sudoku
$(document).ready(function () {
  var sudokuData = [
    [null, 3, null, null, null, 6, null, 7, null],
    [5, null, null, 3, null, 9, 1, null, 8],
    [null, null, null, 4, 1, null, null, null, null],
    [2, 4, null, 9, null, null, null, null, 7],
    [6, null, 7, 2, 5, 3, 9, null, 4],
    [9, null, null, null, null, 4, null, 3, 2],
    [null, null, null, null, 4, 2, null, null, null],
    [7, null, 5, 6, null, 8, null, null, 3],
    [null, 9, null, 7, null, null, null, 6, null],
  ];

  function createSudokuTable() {
    var table = $("<table>", { class: "w1" }).attr({
      cellpadding: "0",
      cellspacing: "1",
      border: "0",
      align: "center",
    });
    // tạo hàng,cột,class của bảng
    for (var i = 0; i < 9; i++) {
      var row = $("<tr>");
      for (var j = 0; j < 9; j++) {
        var value = sudokuData[i][j];
        var input = $("<input>").attr({
          type: "number",
          value: value !== null ? value : "",
          maxlength: "1",
          class:
            "sector" +
            (Math.floor(i / 3) * 3 + Math.floor(j / 3) + 1) +
            " row" +
            (i + 1) +
            " column" +
            (j + 1) +
            (i % 3 === 0 && j % 3 === 0 ? " keysector" : "") +
            (i === 0 ? " keycolumn" : "") +
            (j === 0 ? " keyrow" : "") +
            (Math.floor(i / 3) % 2 === Math.floor(j / 3) % 2 ? " alt" : ""),
        });
        row.append($("<td>").append(input));
      }
      table.append(row);
    }

    // hiển thị bảng ra giao diện
    $("body").append(
      $("<div>", { class: "container  h1v df aic" }).append(
        $("<div>", { class: "content df bóng" }).append(
          $("<div>", {
            class: "menu col-md-3 df fdc aic  bgsc bgrn bgpc",
          })
            .css({ backgroundImage: 'url("./assets/nen1.jpg")' })
            .append(
              $("<div>", { class: "cf fsi tac fs3 fwb pa25 " }).text("SUDOKU"),
              $("<div>", { class: "wh1 df fdc aic jcsa h50 cf mt50" }).append(
                $("<div>", { class: "btn pa15 w70 tac bra15 fwb fs11" })
                  .css("background-color", "rgba(225,225,225,0.5)")
                  .text("Luật Chơi"),
                $("<form>", { class: " w70 tac pa15 bra15 fwb fs11 df" })
                  .css("background-color", "rgba(225,225,225,0.5)")
                  .append(
                    $("<label>").text("Độ khó :"),
                    $("<select>", { class: "bn tac bgct fwb" }).append(
                      $("<option>").text("Dễ"),
                      $("<option>").text("Trung bình"),
                      $("<option>").text("Khó")
                    )
                  ),
                $("<div>", { class: "btn pa15 w70 tac bra15 fwb fs11" })
                  .css("background-color", "rgba(225,225,225,0.5)")
                  .text("Bắt Đầu")
              )
            ),
          $("<div>", { class: "menu col-md-9 df h1 bgsc bgrn bgpc" })
            .css("background-image", "url('assets/nen2.jpg')")
            .append(
              $("<div>", { class: "game-content df wh1 pa25 jcsc" })
                .css(
                  "background-image",
                  "linear-gradient(rgba(17, 17, 17, 0.5), rgba(130, 121, 121, 0.5))"
                )
                .append(
                  
                  $("<div>", { class: "sudoku-table" }).append(
                    $("<div>", { class: "time ptb25 tar cf df jcfe" }).append(
                      $("<i>", {
                        class: "fa-solid fa-hourglass-half plr10 fs15",
                      }),
                      $("<span>").text("00:00")
                    ),
                    $("<div>", { class: "df jcsc" }).append(
                      // sudoku-table
                      $("<div>", { class: "w50" }).append(table),
                      // keyboard,
                      $("<div>", { class: "w30 df pl25" }).append(
                        $("<div>", { class: "bóng b1s h1 df fdc jcsc" })
                          .css("background-color", "rgba(225,225,225,0.3)")
                          .append(
                            $("<div>", { class: " cf w1 tac ptb15 fs13" }).text(
                              "Keyboard"
                            ),
                            $("<div>", {
                              class: "w1 df fww",
                            }).append(
                              $.map([1, 2, 3, 4, 5, 6, 7, 8, 9], function (el) {
                                return $("<div>", {
                                  class: "w33 df jcsc ptb15 btn",
                                }).append(
                                  $("<div>", {
                                    class:
                                      "btn pa25 w33 h30 bra15 df jcsc aic bgcf fs15 fwb",
                                  }).append(el)
                                );
                              }),
                              // chs lai
                              $("<div>", { class: "df w1 jcsa ptb25" }).append(
                                $("<div>", {
                                  class:
                                    "btn pa25 h30 bra15 df jcsc aic bgcf fwb ",
                                })
                                  .css("background-color", "#ffff")
                                  .text("Chơi Lại"),
                                $("<i>", {
                                  class:
                                    "fa-solid fa-xmark w33 pa25 h30 bra15 df jcsc aic bgcf fs15 fwb btn",
                                })
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
  }
  createSudokuTable(); // call

  // -------------------------------------------------------------------------------------------------------------------------------------
  // Logic game
  // Lặp qua bảng và tìm các ô đã được điền trước, sau đó khóa chúng
  $("input").each(function () {
    var prePopVal = $(this).val();
    if (prePopVal > 0) {
      $(this).addClass("prepopulated").attr("disabled", "disabled");
    } else {
      $(this).addClass("playable");
    }
  });

  // Ngăn nhập bất cứ thứ gì ngoài số từ 1-9
  $("input").keyup(function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^1-9\.]/g, "")
    );
    var val = $(this).val();
    var valLength = val.length;
    var maxCount = $(this).attr("maxlength");
    if (valLength > maxCount) {
      $(this).val($(this).val().substring(0, maxCount));
    }
    $(this).blur();
  });
  // check số vừa nhập vào bảng
  $("input").on("input", function (event) {
    checkRows();
    checkColumns();
    checkSectors();
  });

  // Hàm kiểm tra hàng, kích hoạt hàm dupes(); cho tất cả các hàng
  var checkRows = function (sectionToCheck) {
    $(".keyrow").each(function () {
      var thisRow = $(this).attr("class").split(" ")[1];
      var sectionToCheck = "." + thisRow;
      dupes(sectionToCheck);
    });
  };

  // Hàm kiểm tra cột, kích hoạt hàm dupes(); cho tất cả các cột
  var checkColumns = function (sectionToCheck) {
    $(".keycolumn").each(function () {
      var thisColumn = $(this).attr("class").split(" ")[2];
      var sectionToCheck = "." + thisColumn;
      dupes(sectionToCheck);
    });
  };

  // Hàm kiểm tra khu vực, kích hoạt hàm dupes(); cho tất cả các khu vực
  var checkSectors = function (sectionToCheck) {
    $(".keysector").each(function () {
      var thisSector = $(this).attr("class").split(" ")[0];
      var sectionToCheck = "." + thisSector;
      dupes(sectionToCheck);
    });
  };

  // Hàm chính kiểm tra tất cả các trùng lặp trong cột, hàng và khu vực
  var dupes = function (sectionToCheck) {
    var sectionValues = [];
    var sectionValues = $(sectionToCheck)
      .map(function () {
        return this.value;
      })
      .get();
    sectionValues = sectionValues.filter(Number);

    function hasDuplicate(arr) {
      var i = arr.length,
        j,
        val;

      while (i--) {
        val = arr[i];
        j = i;
        while (j--) {
          if (arr[j] === val) {
            return true;
          }
        }
      }
      return false;
    }

    if (hasDuplicate(sectionValues)) {
      $(".error").addClass("banana").show();
      $(".ok").hide();
      $(".completed").hide();
      $(sectionToCheck).addClass("inerror");
      setTimeout(function () {
        $(sectionToCheck).removeClass("inerror");
        $(".error").removeClass("banana").fadeOut();
      }, 1000);
    } else {
      if (!$(".error").hasClass("banana")) {
        $(".ok").show();
      }
      setTimeout(function () {
        $(".ok").fadeOut();
      }, 1000);
    }
  };
});
