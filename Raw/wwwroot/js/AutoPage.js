$(document).ready(() => {
    const mainLoader = $("#mainLoader");
    const mainArea = $("#mainArea");
    const mainBlock = $("#mainBlock");

    const pageBuilder = (pageName) => {
        mainBlock.html("");
        mainArea.toggleClass("d-none");
        mainLoader.toggleClass("m-fadeOut");
        mainLoader.toggleClass("m-fadeIn");
        setTimeout(() => {
            mainArea.toggleClass("d-none");
            mainLoader.toggleClass("m-fadeIn");
            mainLoader.toggleClass("m-fadeOut");
            mainLoader.attr("src", Math.round(Math.random() * 2) ? "/icons/loadingBlack.gif" : "/icons/loadingWhite.gif");
            mainLoader.css("transform",
                "scale("
                + Math.ceil(Math.random() * 1) * (Math.round(Math.random()) ? 1 : -1)
                + "," +
                Math.ceil(Math.random() * 1) * (Math.round(Math.random()) ? 1 : -1)
                + ")");
        }, 1000);

        if ($("#interactivePage").length > 0) {
            const path = "/AutoPages/Experience.json";

            let rowCount = 0;
            let rowDiv = $("<div/>", { class: "row" });
            let elementCount = 0;
            let leftColumnCount = 0
            let rightColumnCount = 0;
            $.ajax({
                cache: false,
                url: path,
                dataType: "json",
                success: (response) => {
                    response = getLeaf(response, pageName)
                    $("#mainTitle").html("İnteraktif " + response.Title)
                    Object.entries(response.Elements).forEach(([key, element], idx, array) => {
                        const column_Div = $("<div/>", { class: "col p-0 d-flex-column-grow-1" });
                        const element_A_href = element.RedirectTo ? element.RedirectTo : element.Link ? element.Link : "#Info";
                        const element_A = $("<a/>", { href: element_A_href, id: key, "data-toggle": "modal", class: "main" });
                        element_A.click(() => {
                            if (element.RedirectTo) {
                                pageBuilder(element.RedirectTo);
                                return false;
                            }
                            if (element.Link) {
                                window.open(element.Link, '_blank');
                                return false;
                            }

                            const modalBody = $("#modal-body");
                            modalBody.html("");
                            const modalTitle = $("<h2/>", { class: "text-center" });
                            modalTitle.html(element.Title);
                            modalTitle.css("background", "url(" + element.Logo + ") left top no-repeat");
                            modalTitle.css("background-size", "contain");
                            modalTitle.appendTo(modalBody);

                            const modalDescription = $("<p/>", { class: "text-start text-pre-line" });
                            modalDescription.html(element.Description);
                            modalDescription.appendTo(modalBody);

                            const modalStartEndDate = $("<p/>", { class: "text-center fw-bold" });
                            const elementStartEndDateText = element.StartDate ?
                                element.EndDate ? element.StartDate + " - " + element.EndDate : element.StartDate
                                :
                                element.EndDate ? element.EndDate : "";
                            modalStartEndDate.html(elementStartEndDateText);
                            modalStartEndDate.appendTo(modalBody);

                            const modalLongDescription = $("<p/>", { class: "text-start text-pre-line" });
                            modalLongDescription.html(element.LongDescription);
                            modalLongDescription.appendTo(modalBody);

                            if (element.InnerLink) {
                                Object.entries(element.InnerLink).forEach(([key, elementInnerLink]) => {
                                    const modalLink = $("<div/>", { class: "row" });

                                    const modalLinkTitle = $("<h5/>", { class: "col-auto" });
                                    modalLinkTitle.html(key + ": ");
                                    modalLinkTitle.appendTo(modalLink);

                                    const modalLinkHref = $("<a/>", { href: elementInnerLink, class: "col", target: "_blank" });
                                    modalLinkHref.html(elementInnerLink);
                                    modalLinkHref.appendTo(modalLink);

                                    modalLink.appendTo(modalBody);
                                });
                            }
                        });

                        const element_A_Div = $("<div/>", { class: "row m-0" });
                        let element_A_Div_TextDiv;
                        if (idx % 2 === 0) {
                            element_A_Div_TextDiv = $("<div/>", { class: "col text-end my-auto" });
                        } else {
                            element_A_Div_TextDiv = $("<div/>", { class: "col text-start my-auto" });
                        }

                        const element_A_Div_TextDiv_Title = $("<h2/>");
                        element_A_Div_TextDiv_Title.html(element.Title);
                        element_A_Div_TextDiv_Title.appendTo(element_A_Div_TextDiv);

                        const element_A_Div_TextDiv_Description = $("<span/>", { class: "text-pre-line" });
                        element_A_Div_TextDiv_Description.html(element.Description);
                        element_A_Div_TextDiv_Description.appendTo(element_A_Div_TextDiv);

                        const element_A_Div_TextDiv_StartEndDate = $("<p/>", { class: "fw-bold" });
                        const elementStartEndDateText = element.StartDate ?
                            element.EndDate ? element.StartDate + " - " + element.EndDate : element.StartDate
                            :
                            element.EndDate ? element.EndDate : "";
                        element_A_Div_TextDiv_StartEndDate.html(elementStartEndDateText);
                        element_A_Div_TextDiv_StartEndDate.appendTo(element_A_Div_TextDiv);

                        if (idx % 2 === 0) {
                            let element_A_Div_ColDiv = $("<div/>", { class: "col-auto p-0 d-flex-column-grow-0 ms-auto" });
                            let element_A_Div_LogoDiv = $("<div/>", { class: "rb-corner d-flex bg-white ms-auto" });
                            const element_A_Div_LogoDiv_Img = $("<img/>", { src: element.Logo, class: "h-65 w-65 mx-auto my-auto" })
                            element_A_Div_LogoDiv_Img.appendTo(element_A_Div_LogoDiv);
                            element_A_Div_TextDiv.appendTo(element_A_Div);
                            element_A_Div_LogoDiv.appendTo(element_A_Div_ColDiv);

                            let element_RowFiller = $("<div/>", { class: "flex-grow-1 m-0 rv-line" });
                            element_RowFiller.appendTo(element_A_Div_ColDiv);

                            element_A_Div_ColDiv.appendTo(element_A_Div);
                            element_A_Div.appendTo(element_A);
                            element_A.appendTo(column_Div);
                            element_RowFiller = $("<div/>", { class: "flex-grow-1 m-0 rv-line" });
                            element_RowFiller.appendTo(column_Div);
                            column_Div.appendTo(rowDiv);
                            leftColumnCount += 1;

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
                            let element_A_Div_ColDiv = $("<div/>", { class: "col-auto p-0 d-flex-column-grow-0 me-auto" });
                            let element_A_Div_LogoDiv = $("<div/>", { class: "lb-corner d-flex bg-white" });
                            const element_A_Div_LogoDiv_Img = $("<img/>", { src: element.Logo, class: "h-65 w-65 mx-auto my-auto" });
                            element_A_Div_LogoDiv_Img.appendTo(element_A_Div_LogoDiv);
                            element_A_Div_LogoDiv.appendTo(element_A_Div_ColDiv);

                            let element_RowFiller = $("<div/>", { class: "flex-grow-1 m-0 lv-line" });
                            element_RowFiller.appendTo(element_A_Div_ColDiv);

                            element_A_Div_ColDiv.appendTo(element_A_Div);
                            element_A_Div_TextDiv.appendTo(element_A_Div);
                            element_A_Div.appendTo(element_A);
                            element_A.appendTo(column_Div);
                            element_RowFiller = $("<div/>", { class: "flex-grow-1 m-0 lv-line" });
                            element_RowFiller.appendTo(column_Div);
                            column_Div.appendTo(rowDiv);

                            rightColumnCount += 1;
                            rowCount += 1;
                            rowDiv = $("<div/>", { class: "row" });
                        }

                        if (idx === array.length - 1 && (idx + 1) % 2 === 1) {
                            elementCount = idx + 1;
                            const column_Div = $("<div/>", { class: "col p-0" });
                            column_Div.appendTo(rowDiv);
                        }

                        rowDiv.appendTo(mainBlock);
                    });
                }
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
                separatorEndDiv.appendTo(mainBlock);
            });
        }
    }

    pageBuilder("Main");
});

const getLeaf = (tree, leafNameList) => {
    leafNameList.split('.').forEach((currentLeaf) => {
        tree = tree[currentLeaf]
    });

    return tree
}