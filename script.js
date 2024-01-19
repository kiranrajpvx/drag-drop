$(document).ready(function () {
    var selectedCell = null;

    // Initialize matrix 1 with numbers
    for (let i = 0; i < 25; i++) {
        $('#matrix1').append('<div class="draggable">' + (i + 1) + '</div>');
    }

    // Initialize matrix 2 with empty, droppable cells
    for (let i = 0; i < 25; i++) {
        $('#matrix2').append('<div class="droppable"></div>');
    }

    // Make the matrix cells draggable
    $('.draggable').draggable({
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
            $(this).addClass("dragging");
        },
        stop: function (event, ui) {
            $(this).removeClass("dragging");
        }
    });

    // Make each cell in matrix 2 droppable
    $('.droppable').droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            $(this).html(ui.helper.clone().removeAttr('style'));
        }
    });

    // Select a cell on click and highlight it
    $('#matrix2').on('click', '.droppable', function () {
        if (selectedCell) {
            selectedCell.removeClass('selected'); // Remove from any previously selected cell
        }
        selectedCell = $(this).addClass('selected'); // Add to the newly selected cell
    });

    // Listen for delete key press to remove selected cell content
    $(document).keydown(function (e) {
        if (e.key === 'Delete' && selectedCell) {
            selectedCell.empty();
            selectedCell.removeClass('selected');
            selectedCell = null;
        }
    });
});

function showMatrixData() {
    var matrixSize = 5; // Assuming a 5x5 matrix
    var matrixData = [];

    for (let row = 0; row < matrixSize; row++) {
        var rowData = [];
        for (let col = 0; col < matrixSize; col++) {
            // Calculate the index in a flat array
            var index = row * matrixSize + col;
            var cellContent = $('#matrix2 .droppable').eq(index).text().trim();
            rowData.push(cellContent || null);
        }
        matrixData.push(rowData);
    }

    var matrixJson = JSON.stringify(matrixData, null, 2); // Beautify the JSON
    $('#jsonDataDisplay').text(matrixJson);
}

$('#showDataBtn').click(function () {
    showMatrixData();
});
