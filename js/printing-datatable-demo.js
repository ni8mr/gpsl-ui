$(document).ready(function () {
    var table = $('#example').DataTable();

    var columns = ["Name", "Position", "Office", "Age", "Start date", "Salary"];
    var rows = [];
    var table_data = table.rows().data();

    for (var i = 0; i < table_data.length; i++) {
        rows.push(table_data[i]);
    }
    var doc = new jsPDF('p', 'pt');

    var lorem_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla lectus elit. Proin at lorem risus. Nunc lobortis, felis id lacinia eleifend, ex massa scelerisque dui, vitae convallis lorem felis at dui. Phasellus cursus neque nec urna aliquam, vel ultrices massa finibus. Mauris euismod libero nulla, eu porttitor enim venenatis id. Sed dictum dapibus tellus, accumsan elementum dolor consequat at."

    var header_text = "Report based on principal"

    var start_text = doc.splitTextToSize(lorem_text + '.', doc.internal.pageSize.width - 30, {});

    doc.setFontSize(18);
    doc.text(header_text, 200, 30);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(start_text, 130, 60);

    var totalPagesExp = "{total_pages_count_string}";
    var footer = function (data) {
        var str = "Page " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + " of " + totalPagesExp;
        }
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 30);
    };

    doc.autoTable(columns, rows, {
        theme: 'striped',
        startY: 130,
        pageBreak: 'auto',
        tableWidth: 'auto',
        afterPageContent: footer,
    });

// Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    }

    var footer_text = "This is the footer. Footer text will be resided here."
    doc.text(footer_text, 40, doc.autoTableEndPosY() + 30);

    $('#cmd').click(function () {
        doc.save('table.pdf');
    });

});