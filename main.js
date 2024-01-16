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
    var table = $("<table>", { class: "wh1 table-sudoku" }).attr({
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
      $(".taobang").append(table)
    }  
  }
  createSudokuTable(); // call

  // -------------------------------------------------------------------------------------------------------------------------------------
  // Logic game

  //check nhập số từ bàn phím ảo
  $(".btnKeyboard").on("mousedown", function () {
    var activeInput = $("input:focus");
    if (activeInput.length > 0) {
      // điều kiện check xem có đang focus vào ô nhập nào k ,
      var key = $(this).data("value");
      activeInput.val(key);
      checkRows();
      checkColumns();
      checkSectors();
    }
  });
  // check số vừa nhập vào bảng bằng bàn phím máy tính
  $("input").on("input", function (event) {
    checkRows();
    checkColumns();
    checkSectors();
  });
  // chơi lại
  $(".play-again").on("click", function(){
    alert("chưa làm")
  })
  //xóa input
  $(".remove").on("mousedown", function () {
    var inputToClear = $("input:focus");
    var removeData = $(this).data("value");
    inputToClear.val(inputToClear.val() + removeData);
  });
  // Bộ đếm thời gian
  var startTime;
  var timerInterval;
  var isPaused = false;
  var pausedTime = 0;

  function startTimer() {
    // Nếu đang tạm dừng, thì cập nhật lại thời gian bắt đầu
    if (isPaused) {
      startTime = new Date().getTime() - pausedTime;
      isPaused = false;
    } else {
      // Nếu không đang tạm dừng, lấy thời gian hiện tại làm thời điểm bắt đầu
      startTime = new Date().getTime();
    }

    // Cập nhật thời gian mỗi giây
    timerInterval = setInterval(function () {
      if (!isPaused) {
        var currentTime = new Date().getTime();
        var elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
        var hours = Math.floor(elapsedTimeInSeconds / 3600);
        var minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
        var seconds = elapsedTimeInSeconds % 60;

        // Định dạng thời gian
        var formattedTime =
          pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

        // Hiển thị thời gian trên trang web
        $(".time").html(formattedTime);
      }
    }, 1000); // Cập nhật mỗi giây
  }
  // tạm dừng thời gian
  function pauseTimer() {
    if (!isPaused && timerInterval) {
      clearInterval(timerInterval);
      isPaused = true;
      pausedTime = new Date().getTime() - startTime;
    }
  }
  function pad(num) {
    return num < 10 ? "0" + num : num;
  }

  // Tính thời gian khi "Bắt đầu chơi"
  $(".start").on("click", function () {
    $(".game-content").show().addClass("dichuyen");
    $(".rule").hide();
    startTimer();
  });

  //audio
  var audioPlayer = $(".audioPlayer");
  var audioPlow = $(".fa-volume-low");
  var audioXmark = $(".fa-volume-xmark");

  audioPlow.on("click", function () {
    audioPlayer[0].play();
    audioPlow.hide();
    audioXmark.show();
  });
  audioXmark.on("click", function () {
    audioPlayer[0].pause();
    audioPlow.show();
    audioXmark.hide();
  });

  // pause
  $(".fa-pause").click(function () {
    pauseTimer();
    $(this).hide();
    $(".fa-play").show();
    $(".table-sudoku").hide();
    $(".continue").css("display", "block");
  });
  // resume
  $(".fa-play").click(function () {
    startTimer();
    $(this).hide();
    $(".continue").css("display", "none");
    $(".fa-pause").show();
    $(".table-sudoku").show();
  });
  $(".btn-continue").click(function () {
    $(".table-sudoku").show();
    $(".continue").hide();
    $(".fa-pause").show();
    $(".fa-play").hide();
    startTimer();
  });
  // luật chơi
  $(".btn-rule").on("click", function () {
    $(".rule").show().addClass("dichuyen");
    $(".game-content").hide();
  });
  // Hàm để đảm bảo rằng số được hiển thị luôn có 2 chữ số
  function pad(number) {
    return (number < 10 ? "0" : "") + number;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------
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

  // Hàm kiểm tra hàng, kích hoạt hàm dupes(); cho tất cả các hàng
  var checkRows = function (sectionToCheck) {
    $(".keyrow").each(function () {
      var thisRow = $(this).attr("class").split(" ")[1];
      console.log(thisRow);
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
