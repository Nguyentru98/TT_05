// tạo bảng sudoku
$(document).ready(function () {
  // Hàm để tạo một bảng Sudoku mới hợp lệ
  function generateRandomSudoku() {
    return [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9],
    ];
  }

  // Hàm để tạo bảng Sudoku với mức độ khó tùy chọn
  function createSudokuTable(level) {
    var sudokuData = generateRandomSudoku();
    function isValid(value, row, col) {
      for (var i = 0; i < 9; i++) {
        if (sudokuData[row][i] === value || sudokuData[i][col] === value) {
          return false;
        }
      }

      var startRow = Math.floor(row / 3) * 3;
      var startCol = Math.floor(col / 3) * 3;
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (sudokuData[startRow + i][startCol + j] === value) {
            return false;
          }
        }
      }
      return true;
    }
    // xáo trộn theo level

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    var valuesToShuffle = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(valuesToShuffle);

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        sudokuData[i][j] = valuesToShuffle[sudokuData[i][j] - 1];
      }
    }

    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (Math.random() > level) {
          var temp = sudokuData[i][j];
          sudokuData[i][j] = null;
          // Kiểm tra tính hợp lệ sau khi ẩn một ô
          if (!isValid(temp, i, j)) {
            // Nếu không hợp lệ, phục hồi giá trị và ẩn ô khác
            sudokuData[i][j] = temp;
          }
        }
      }
    }

    var table = $("<table>", { class: "wh1 table-sudoku" }).attr({
      cellpadding: "0",
      cellspacing: "1",
      border: "0",
      align: "center",
    });

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
      $(".taobang").empty().append(table);
    }
    checkInputDisabled();
  }
  // win game
  $(".end-game").on("click", function () {
    var sudokuSolved = true;
    $("input").each(function () {
      if (!$(this).val()) {
        sudokuSolved = false;
        return false;
      }
    });

    if (sudokuSolved) {
      alert("Sudoku đã được giải!");
    } else {
      alert("Vui lòng điền đầy đủ các ô");
    }
  });
  // người chơi
  function nguoiChoi() {
    let input = $("textarea").val();
    if (input !== "") {
      $(".player").text(input);
      return true;
    } else {
      alert("Vui lòng nhập thông tin người chơi.");
      return false; 
    }
  }
  

  // luật chơi
  $(".btn-rule").on("click", function () {
    if ($(".rule").hide().hasClass("dichuyen")) {
      $(".rule").removeClass("dichuyen");
      $(".game-content").show();
      $(this).text("Luật Chơi");
    } else {
      $(".rule").show().addClass("dichuyen");
      $(".game-content").hide();
      $(this).text("Đóng");
    }
  });

  // start game
  const level_name = ["Dễ", "Trung bình", "Khó"];
  const level = [1, 0.7, 0.5];
  var btnLevel = $(".btnLevel");
  var levelText = $(".level");
  var level_index = 0;
  var level_nameIndex = 0;

  //set độ khó và cập nhật giao diện
  function setDifficulty(index) {
    level_nameIndex = index;
    level_index = level_nameIndex;
    let newName_levelIndex = level_name[level_nameIndex];
    let new_levelIndex = level[level_index];
    levelText.text(newName_levelIndex);
    createSudokuTable(new_levelIndex);
  }

  // Bắt sự kiện click trên nút độ khó
  btnLevel.on("click", function () {
    level_nameIndex =
      level_index + 1 > level_name.length - 1 ? 0 : level_index + 1;
    setDifficulty(level_nameIndex);
    startTimer();
  });

  // Bắt đầu chơi và chọn độ khó
  var isButtonClicked = false;
  $(".start").on("click", function () {
    if( nguoiChoi()){
      if (!isButtonClicked) {
        // Lấy độ khó hiện tại và bắt đầu trò chơi
        let currentDifficulty = level[level_index];
        $(".game-content").show().addClass("dichuyen");
        $(".rule").hide();
        $(this).text("Đang Chơi...");
        startTimer();
        createSudokuTable(currentDifficulty);
        $(this).attr("disabled", "disabled");
        //biến theo dõi trạng thái đã click
        isButtonClicked = true;
        $(".end-game").show();
      }
    }
    
  });

  // chơi lại
  $(".play-again").on("click", function () {
    startTimer();
    $("input").each(function () {
      if (!$(this).prop("disabled")) {
        $(this).val(null);
      }
    });
  });

  // nhập số từ bàn phím ảo
  var keyboardButtons = $(".btnKeyboard");
  keyboardButtons.on("mousedown", function (event) {
    var key = $(this).data("value");
    var focusedInput = $("input:focus");
    if (focusedInput.length > 0) {
      event.preventDefault();
      focusedInput.val(key);
      focusedInput.focus();
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

  //xóa input
  $(".remove").on("mousedown", function () {
    var inputToClear = $("input:focus");
    var removeData = $(this).data("value");
    inputToClear.val(removeData);
  });
  // tính điểm ,1 điểm mỗi phút
  function calculateScore(elapsedTimeInSeconds) {
    var score = Math.floor(elapsedTimeInSeconds / 60);
    return score;
  }

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

        // Tính điểm dựa trên thời gian đã trôi qua
        var score = calculateScore(elapsedTimeInSeconds);

        // Hiển thị điểm trên trang web (thay thế bằng phần tử hiển thị điểm thực tế của bạn)
        $(".score").html("Điểm: " + score);
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

  //audio
  var audioPlayer = $(".audioPlayer");
  var audioPlow = $(".fa-volume-low");
  var audioXmark = $(".fa-volume-xmark");

  audioPlow.on("click", function () {
    audioPlayer[0].pause();
    audioPlow.hide();
    audioXmark.show();
  });
  audioXmark.on("click", function () {
    audioPlayer[0].play();
    audioPlow.show();
    audioXmark.hide();
  });

  // tạm dừng thời gian
  $(".fa-pause").click(function () {
    pauseTimer();
    $(this).hide();
    $(".fa-play").show();
    $(".taobang").hide();
    $(".continue").css("display", "block");
  });

  // thời gian tiếp tục
  $(".fa-play").click(function () {
    startTimer();
    $(this).hide();
    $(".continue").css("display", "none");
    $(".fa-pause").show();
    $(".taobang").show();
  });
  $(".btn-continue").click(function () {
    $(".taobang").show();
    $(".continue").hide();
    $(".fa-pause").show();
    $(".fa-play").hide();
    startTimer();
  });

  //--------------------------------------------------------------------------------------------------------------------------------------

  // Lặp qua bảng và tìm các ô đã được điền trước, sau đó khóa chúng
  function checkInputDisabled() {
    let input = $("input");
    input.each(function () {
      var prePopVal = $(this).val();
      if (prePopVal > 0) {
        $(this).addClass("prepopulated").attr("disabled", "disabled");
      } else {
        $(this).addClass("playable");
      }
    });
  }
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
      var sectionToCheck = "." + thisRow;
      console.log(thisRow, "thisRow", sectionToCheck, "sectionToCheck");
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
