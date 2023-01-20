$(document).ready(() => {
    if ($("#interactivePage").length > 0) {
        const pathName = window.location.pathname.split('/')[1];
        const path = "/AutoPages/" + pathName + ".json";

        let rowCount = 0;
        let rowDiv = $("<div/>", { class: "row" });
        let elementCount = 0;
        let leftColumnCount = 0
        let rightColumnCount = 0;
        $.getJSON(path, (response) => {
            response.Elements.forEach((element, idx, array) => {
                const column_Div = $("<div/>", { class: "col p-0" });
                const element_A = $("<a/>", { href: "#modal", id: element.Id, "data-toggle": "modal", class: "main" });
                element_A.click(() => {
                    const elemData = response.Elements.filter((resElem) => { return resElem.Id == element.Id })[0];
                    $("#modal-body").html("");

                    const modalTitle = $("<h2/>", { class: "text-center" });
                    modalTitle.html(elemData.Title);
                    modalTitle.css("background", "url(" + element.Logo + ") left top no-repeat");
                    modalTitle.css("background-size", "contain");
                    modalTitle.appendTo("#modal-body");

                    const modalDescription = $("<p/>", { class: "text-start" });
                    modalDescription.html(elemData.Description);
                    modalDescription.appendTo("#modal-body");

                    const modalStartEndDate = $("<p/>", { class: "text-center fw-bold" });
                    modalStartEndDate.html(element.StartDate + " - " + element.EndDate);
                    modalStartEndDate.appendTo("#modal-body");

                    const modalLongDescription = $("<p/>", { class: "text-start" });
                    modalLongDescription.css("white-space", "pre-line")
                    modalLongDescription.html(element.LongDescription);
                    modalLongDescription.appendTo("#modal-body");
                });

                const element_A_Div = $("<div/>", { class: "row m-0" });
                let element_A_Div_TextDiv;
                if (idx % 2 === 0) {
                    element_A_Div_TextDiv = $("<div/>", { class: "col text-center ms-5 my-auto" });

                } else {
                    element_A_Div_TextDiv = $("<div/>", { class: "col text-center me-5 my-auto" });
                }

                const element_A_Div_TextDiv_Title = $("<h2/>");
                element_A_Div_TextDiv_Title.html(element.Title);
                element_A_Div_TextDiv_Title.appendTo(element_A_Div_TextDiv);

                const element_A_Div_TextDiv_Description = $("<span/>");
                element_A_Div_TextDiv_Description.html(element.Description);
                element_A_Div_TextDiv_Description.appendTo(element_A_Div_TextDiv);

                const element_A_Div_TextDiv_StartEndDate = $("<p/>", { class: "fw-bold" });
                element_A_Div_TextDiv_StartEndDate.html(element.StartDate + " - " + element.EndDate);
                element_A_Div_TextDiv_StartEndDate.appendTo(element_A_Div_TextDiv);

                if (idx % 2 === 0) {
                    let element_A_Div_LogoDiv = $("<div/>", { class: "rb-corner d-flex bg-white ms-auto" });
                    const element_A_Div_LogoDiv_Img = $("<img/>", { src: element.Logo, class: "w-75 mx-auto my-auto" })
                    element_A_Div_LogoDiv_Img.appendTo(element_A_Div_LogoDiv); leftColumnCount += 1;
                    element_A_Div_TextDiv.appendTo(element_A_Div);
                    element_A_Div_LogoDiv.appendTo(element_A_Div);
                    element_A_Div.appendTo(element_A);
                    const element_RowFiller = $("<div/>", { class: "row h-5vh m-0 rv-line" })
                    element_A.appendTo(column_Div);
                    element_RowFiller.appendTo(column_Div);
                    column_Div.appendTo(rowDiv);

                    for (let counter = 0; counter < rowCount; counter++) {
                        const elementSeparator = $("<div/>", { class: "separator rv-line" });
                        elementSeparator.appendTo(rowDiv);
                    }

                    const elementSeparator = $("<div/>", { class: "separator" });
                    elementSeparator.appendTo(rowDiv);

                    for (let counter = 0; counter < rowCount; counter++) {
                        const elementSeparator = $("<div/>", { class: "separator lv-line" });
                        elementSeparator.appendTo(rowDiv);
                    }
                }
                else {
                    let element_A_Div_LogoDiv = $("<div/>", { class: "lb-corner d-flex bg-white" });
                    const element_A_Div_LogoDiv_Img = $("<img/>", { src: element.Logo, class: "w-75 mx-auto my-auto" })
                    element_A_Div_LogoDiv_Img.appendTo(element_A_Div_LogoDiv); rightColumnCount += 1;
                    element_A_Div_LogoDiv.appendTo(element_A_Div);
                    element_A_Div_TextDiv.appendTo(element_A_Div);
                    element_A_Div.appendTo(element_A);
                    const element_RowFiller = $("<div/>", { class: "row h-5vh m-0" })
                    element_RowFiller.appendTo(column_Div);
                    element_A.appendTo(column_Div);
                    column_Div.appendTo(rowDiv);

                    rowCount += 1;
                    rowDiv = $("<div/>", { class: "row" });
                }

                if (idx === array.length - 1 && (idx + 1) % 2 === 1) {
                    elementCount = idx + 1;
                    const column_Div = $("<div/>", { class: "col p-0" });
                    column_Div.appendTo(rowDiv);
                }

                rowDiv.appendTo($("#mainBlock"));
            });
        }).then(() => {
            const separatorEndDiv = $("<div/>", { class: "row mx-auto d-flex-row-grow-1" });

            for (let counter = 0; counter < leftColumnCount; counter++) {
                const elementSeparator = $("<div/>", { class: "separator rv-line" });
                elementSeparator.appendTo(separatorEndDiv);
            }

            const elementSeparator = $("<div/>", { class: "separator" });
            elementSeparator.appendTo(separatorEndDiv);

            for (let counter = 0; counter < rightColumnCount; counter++) {
                const elementSeparator = $("<div/>", { class: "separator lv-line" });
                elementSeparator.appendTo(separatorEndDiv);
            }

            if (elementCount % 2 === 1) {
                const elementSeparator = $("<div/>", { class: "separator" });
                elementSeparator.appendTo(separatorEndDiv);
            }
            separatorEndDiv.appendTo($("#mainBlock"));
        });
    }
});