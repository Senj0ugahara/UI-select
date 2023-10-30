window.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('.select');

  const openSelect = () => {
    select.querySelector('.select-header').addEventListener('click', () => {
      select.querySelector('.select-body').classList.toggle('is-open');
      select.querySelector('.select-header').classList.toggle('is-active');
    })
  }

  openSelect();

  const choiceLocation = () => {
    const selectWrapper = document.querySelector('.select-body__wrapper_type_radio');
    const selectTabs = document.querySelector('.select-body__wrapper_type_list');

    const getActiveTabName = () => {
      return selectWrapper.querySelector('.select-radio_type_checked').dataset.status;
    }

    const setActiveContent = () => {
      if (selectTabs.querySelector('.select-list_type_active')) {
        selectTabs.querySelector('.select-list_type_active').classList.remove('select-list_type_active');
      }
      selectTabs.querySelector(`[data-status=${getActiveTabName()}]`).classList.add('select-list_type_active');
    }

    if (!selectWrapper.querySelector('.select-radio_type_checked')) {
      selectWrapper.querySelector('.select-radio').classList.add('select-radio_type_checked');
    }

    setActiveContent(getActiveTabName())

    selectWrapper.addEventListener('click', e => {
      const radioItem = e.target.closest('.select-radio');
      if (!radioItem) return;
      if (radioItem.classList.contains('select-radio_type_checked')) return;

      if (selectWrapper.querySelector('.select-radio_type_checked')) {
        selectWrapper.querySelector('.select-radio_type_checked').classList.remove('select-radio_type_checked');
      }

      radioItem.classList.add('select-radio_type_checked');

      setActiveContent(getActiveTabName());
    })
  }

  choiceLocation();

  const selectedValue = () => {
    const selectItems = document.querySelectorAll('.select-item');
    const selectChoiced = document.querySelector('.select-choiced');
    const selectChoiceCount = document.querySelector('.select-header__choice-count');

    for (let i = 0; i < selectItems.length; i++) {
      selectChoiced.innerHTML += `
        <div class="select-choiced__item">
          <p class="select-choiced__name">${selectItems[i].textContent}</p>
          <span class="select-choiced__close"></span>
        </div>
      `
      selectItems[i].addEventListener('click', () => {
        selectItems[i].querySelector('.select-item__choice').classList.toggle('select-item__choice_type_choiced');
        document.querySelectorAll('.select-choiced__item')[i].classList.toggle('is-active');

        if (document.querySelector('.select-choiced__item.is-active')) {
          document.querySelector('.select-body__wrapper_type_choiced').classList.add('is-active');
        } else {
          document.querySelector('.select-body__wrapper_type_choiced').classList.remove('is-active');
        }

        let selectChoicedCount = document.querySelectorAll('.select-choiced__item.is-active');
        selectChoiceCount.textContent = selectChoicedCount.length;

        if (+selectChoiceCount.textContent > 0) {
          selectChoiceCount.classList.add('is-choiced');
          selectChoiceCount.textContent = selectChoicedCount.length;
        } else {
          selectChoiceCount.classList.remove('is-choiced');
        }

        const selectChoicedClose = document.querySelectorAll('.select-choiced__close');

        selectChoicedClose[i].addEventListener('click', () => {
          document.querySelectorAll('.select-choiced__item')[i].classList.remove('is-active');
          selectItems[i].querySelector('.select-item__choice_type_choiced').classList.remove('select-item__choice_type_choiced');

          selectChoiceCount.textContent--

          if (+selectChoiceCount.textContent > 0) {
            selectChoiceCount.classList.add('is-choiced');
          } else {
            selectChoiceCount.classList.remove('is-choiced');
          }

          if (document.querySelector('.select-choiced__item.is-active')) {
            document.querySelector('.select-body__wrapper_type_choiced').classList.add('is-active');
          } else {
            document.querySelector('.select-body__wrapper_type_choiced').classList.remove('is-active');
          }
        })
      })
    }
  }

  selectedValue();
})