let readonlyData = document.querySelector('.readonlyData'),
    selectBox = document.querySelectorAll('.selectBox'),

    prev = document.querySelector('.prev'),
    pageBtn = document.querySelector('.pageBtn'),
    next = document.querySelector('.next'),
    readonlyPage = document.querySelector('.readonlyPage'),
    page = document.querySelector('.page'),
    go = document.querySelector('.go');

for(let i = 0; i < selectBox.length; i++)
{
    // 1、优先级选择元素法
    // let maxRow_maxBtn = selectBox[i].querySelector('.selectMaxRow') || selectBox[i].querySelector('.selectMaxBtn'),
    // 2、没有优先级选择元素法
    let maxRow_maxBtn = selectBox[i].querySelector('.selectMaxRow, .selectMaxBtn'),
        arrow = selectBox[i].querySelector('.arrow');

    selectBox[i].onclick = function()
    {
        selectBox[i].classList.toggle('selectBox_radius');
        maxRow_maxBtn.classList.toggle('maxRow_maxBtn');
        arrow.classList.toggle('arrow_deg');
    }
}