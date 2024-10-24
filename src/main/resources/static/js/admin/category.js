// 드래그 앤 드롭 기능
const categoryList = document.getElementById('categoryList');
let draggedElement = null; // 드래그한 요소를 저장할 변수

// 드래그 시작
categoryList.addEventListener('dragstart', function(event) {
    const target = event.target.closest('.category-item, .subcategory-item'); // 가장 가까운 드래그 가능한 요소 찾기
    if (target) {
        draggedElement = target; // 드래그할 요소를 저장
        event.dataTransfer.effectAllowed = 'move';
        draggedElement.classList.add('dragging'); // 드래그 클래스 추가
    }
});

// 드래그 오버
categoryList.addEventListener('dragover', function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
});

// 드래그 종료
categoryList.addEventListener('dragleave', function(event) {
    const target = event.target.closest('.category-item, .subcategory-item'); // 가장 가까운 드래그 가능한 요소 찾기
    if (target) {
        target.classList.remove('dragging');
    }
});

// 드롭
categoryList.addEventListener('drop', function(event) {
    event.preventDefault();
    const targetElement = event.target.closest('.category-item, .subcategory-item');

    if (targetElement && draggedElement) {
        // 같은 계층끼리만 드래그 앤 드롭 가능하게 체크
        if (draggedElement.classList.contains('category-item') && targetElement.classList.contains('category-item')) {
            // 1차 카테고리끼리만 이동
            categoryList.insertBefore(draggedElement, targetElement.nextSibling);
        } else if (draggedElement.classList.contains('subcategory-item') && targetElement.classList.contains('subcategory-item')) {
            // 2차 카테고리끼리만 이동
            const draggedParentCategory = draggedElement.closest('.category-item'); // 드래그된 2차 카테고리의 상위 1차 카테고리
            const targetParentCategory = targetElement.closest('.category-item'); // 드롭될 2차 카테고리의 상위 1차 카테고리

            // 같은 1차 카테고리 내에서만 2차 카테고리를 이동할 수 있도록 제한
            if (draggedParentCategory === targetParentCategory) {
                const subcategoryList = targetElement.closest('.subcategory-list');
                subcategoryList.insertBefore(draggedElement, targetElement.nextSibling);
            } else {
                // 다른 1차 카테고리로 이동 시도 시 경고 메시지
                alert("2차 카테고리는 다른 1차 카테고리로 이동할 수 없습니다.");
            }
        } else {
            // 다른 계층 간 이동 시 경고 메시지
            alert("다른 계층 간에는 이동할 수 없습니다.");
        }
    }

    // 드래그한 요소가 존재할 경우에만 클래스를 제거합니다.
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        draggedElement = null; // 드래그한 요소를 초기화
    }
});


// 카테고리 열기/닫기 기능 (1차 및 2차 카테고리)
document.getElementById('categoryList').addEventListener('click', function(event) {
    // 1차 카테고리 토글
    const categoryHeader = event.target.closest('.category-header');
    if (categoryHeader) {
        const subcategoryList = categoryHeader.nextElementSibling;
        const toggleIcon = categoryHeader.querySelector('.toggle-icon');

        const isHidden = subcategoryList.style.display === 'none' || subcategoryList.style.display === '';

        // 서브 카테고리 보이기/숨기기
        subcategoryList.style.display = isHidden ? 'block' : 'none';

        // 토글 아이콘 변경
        toggleIcon.textContent = isHidden ? '▼' : '▶';
    }

    // 2차 카테고리 토글
    const subcategoryHeader = event.target.closest('.subcategory-header');
    if (subcategoryHeader) {
        const tertiaryCategoryList = subcategoryHeader.nextElementSibling;
        const toggleIcon = subcategoryHeader.querySelector('.toggle-icon');

        const isHidden = tertiaryCategoryList.style.display === 'none' || tertiaryCategoryList.style.display === '';

        // 3차 카테고리 보이기/숨기기
        tertiaryCategoryList.style.display = isHidden ? 'block' : 'none';

        // 토글 아이콘 변경
        toggleIcon.textContent = isHidden ? '▼' : '▶';
    }
});


// 페이지 로드 시 서브 카테고리 숨기기
document.querySelectorAll('.subcategory-list').forEach(list => list.style.display = 'none');

// 1차 카테고리 추가 기능
document.getElementById('addCategoryBtn').addEventListener('click', function() {
    const newCategoryName = document.getElementById('newCategoryInput').value.trim();

    if (newCategoryName === '') {
        alert('카테고리 이름을 입력하세요.');
        return;
    }

    // 새로운 1차 카테고리 HTML 요소
    const newCategoryItem = document.createElement('li');
    newCategoryItem.classList.add('category-item');
    newCategoryItem.innerHTML = `
                <div class="category-header">
                    <span class="toggle-icon">▶</span>
                    <span>${newCategoryName}</span>
                    <button class="delete-btn">삭제</button>
                </div>
                <ul class="subcategory-list" style="display: none;">
                    <button class="add-btn">+ 2차 카테고리 추가</button>
                </ul>
                <div class="add-subcategory-section" style="display: none;">
                    <input type="text" class="newSubcategoryInput" placeholder="2차 카테고리 이름을 입력하세요" />
                    <button class="add-subcategory-btn">+ 추가</button>
                </div>
            `;

    // 1차 카테고리 리스트에 추가
    document.getElementById('categoryList').appendChild(newCategoryItem);

    // 새로 추가된 1차 카테고리의 토글 기능 추가
    const header = newCategoryItem.querySelector('.category-header');
    header.addEventListener('click', function() {
        const subcategoryList = this.nextElementSibling;
        const toggleIcon = this.querySelector('.toggle-icon');

        const isHidden = subcategoryList.style.display === 'none' || subcategoryList.style.display === '';

        // 서브 카테고리 보이기/숨기기
        subcategoryList.style.display = isHidden ? 'block' : 'none';

        // 토글 아이콘 변경
        toggleIcon.textContent = isHidden ? '▼' : '▶';
    });

    // 2차 카테고리 추가 버튼에 클릭 이벤트 추가
    const addBtn = newCategoryItem.querySelector('.add-btn');
    addBtn.addEventListener('click', function() {
        const addSubcategorySection = newCategoryItem.querySelector('.add-subcategory-section');
        addSubcategorySection.style.display = addSubcategorySection.style.display === 'none' ? 'block' : 'none';
    });

    // 입력 필드 비우기
    document.getElementById('newCategoryInput').value = '';
});

// 페이지 로드 시 기존 .add-btn 버튼에 클릭 이벤트 리스너 추가
document.querySelectorAll('.add-btn').forEach(addBtn => {
    addBtn.addEventListener('click', function() {
        // .subcategory-list의 다음 형제 요소가 아니라, 현재 addBtn이 속한 category-item 내의 .add-subcategory-section을 찾습니다.
        const addSubcategorySection = addBtn.closest('.category-item').querySelector('.add-subcategory-section');
        addSubcategorySection.style.display = addSubcategorySection.style.display === 'none' ? 'block' : 'none';
    });
});


// 각 2차 카테고리 추가 버튼에 클릭 이벤트 추가
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-subcategory-btn')) {
        const subcategoryInput = event.target.previousElementSibling;
        const subcategoryName = subcategoryInput.value.trim();

        if (subcategoryName === '') {
            alert('2차 카테고리 이름을 입력하세요.');
            return;
        }

        // 새로운 2차 카테고리 HTML 요소
        const newSubcategoryItem = document.createElement('li');
        newSubcategoryItem.classList.add('subcategory-item');
        newSubcategoryItem.innerHTML = `
            <div class="subcategory-header">
                <span class="toggle-icon">▶</span>
                <span>${subcategoryName}</span>
                <button class="delete-btn">삭제</button>
            </div>
            <ul class="tertiary-category-list" style="display:none;">
                <button class="add-btn">+ 3차 카테고리 추가</button>
            </ul>
        `;

        // 해당 서브 카테고리 리스트에 추가
        const subcategoryList = event.target.closest('.category-item').querySelector('.subcategory-list');
        const lastChild = subcategoryList.lastElementChild; // 마지막 자식 요소
        subcategoryList.insertBefore(newSubcategoryItem, lastChild); // 마지막 자식 요소 앞에 추가

        // 3차 카테고리 토글 기능 추가
        const subcategoryHeader = newSubcategoryItem.querySelector('.subcategory-header');
        subcategoryHeader.addEventListener('click', function() {
            const tertiaryCategoryList = this.nextElementSibling;
            const toggleIcon = this.querySelector('.toggle-icon');

            const isHidden = tertiaryCategoryList.style.display === 'none' || tertiaryCategoryList.style.display === '';

            // 3차 카테고리 보이기/숨기기
            tertiaryCategoryList.style.display = isHidden ? 'block' : 'none';

            // 토글 아이콘 변경
            toggleIcon.textContent = isHidden ? '▼' : '▶';
        });

        // 입력 필드와 버튼 숨기기
        const addSubcategorySection = event.target.closest('.add-subcategory-section');
        addSubcategorySection.style.display = 'none';

        // 입력 필드 비우기
        subcategoryInput.value = '';
    }
});


// 카테고리 및 서브 카테고리 삭제 기능 추가
document.addEventListener('click', function(event) {
    // 1차 카테고리 삭제
    if (event.target.classList.contains('delete-btn') && event.target.closest('.category-header')) {
        const categoryItem = event.target.closest('.category-item');
        if (categoryItem) {
            categoryItem.remove(); // 해당 .category-item 삭제
        }
    }

    // 2차 카테고리 삭제
    if (event.target.classList.contains('delete-btn') && event.target.closest('.subcategory-item')) {
        const subcategoryItem = event.target.closest('.subcategory-item');
        if (subcategoryItem) {
            subcategoryItem.remove(); // 해당 .subcategory-item 삭제
        }
    }
});