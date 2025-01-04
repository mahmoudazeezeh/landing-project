// اختيار عناصر الهامبرغر وقائمة التنقل
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('dynamic-nav');
const sections = document.querySelectorAll('.content-section');
const navContainer = document.getElementById('dynamic-nav');

// بناء قائمة التنقل ديناميكيًا بناءً على الأقسام
const buildNavigation = () => {
  const fragment = document.createDocumentFragment();

  sections.forEach(section => {
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');
    navLink.href = `#${section.id}`;
    navLink.textContent = section.dataset.title;
    navLink.classList.add('nav-link');
    navItem.appendChild(navLink);
    fragment.appendChild(navItem);
  });

  navContainer.appendChild(fragment);
};

// تنفيذ السحب الناعم عند النقر على روابط التنقل
const implementSmoothScroll = () => {
  navContainer.addEventListener('click', (event) => {
    if (event.target.nodeName === 'A') {
      event.preventDefault();
      const targetSection = document.querySelector(event.target.getAttribute('href'));
      targetSection.scrollIntoView({ behavior: 'smooth' });

      // إغلاق قائمة التنقل إذا كانت مفتوحة على الشاشات الصغيرة
      if (navList.classList.contains('open')) {
        navList.classList.remove('open');
        hamburger.classList.remove('active');
      }
    }
  });
};

// تحديد ما إذا كان القسم داخل منطقة العرض (viewport)
const isSectionInView = (section) => {
  const bounding = section.getBoundingClientRect();
  return (
    bounding.top >= -200 &&
    bounding.top <= window.innerHeight / 2
  );
};

// تفعيل القسم النشط وإبراز الرابط المقابل في قائمة التنقل
const activateSection = (section) => {
  section.classList.add('active-section');
  const correspondingNav = document.querySelector(`a[href="#${section.id}"]`);
  if (correspondingNav) {
    correspondingNav.classList.add('active-link');
  }
};

// إزالة تفعيل القسم وإزالة إبراز الرابط المقابل في قائمة التنقل
const deactivateSection = (section) => {
  section.classList.remove('active-section');
  const correspondingNav = document.querySelector(`a[href="#${section.id}"]`);
  if (correspondingNav) {
    correspondingNav.classList.remove('active-link');
  }
};

// تمييز الأقسام النشطة أثناء التمرير
const highlightActiveSection = () => {
  sections.forEach(section => {
    if (isSectionInView(section)) {
      activateSection(section);
    } else {
      deactivateSection(section);
    }
  });
};

// إضافة مستمع حدث للنقر على الهامبرغر لفتح/إغلاق قائمة التنقل
hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// إغلاق قائمة التنقل عند النقر على أحد الروابط
navList.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navList.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// بناء قائمة التنقل وتنفيذ السحب الناعم عند تحميل المحتوى
document.addEventListener('DOMContentLoaded', () => {
  buildNavigation();
  implementSmoothScroll();
  highlightActiveSection(); // تمييز القسم النشط عند التحميل
});

// تحديث تمييز الأقسام عند التمرير
window.addEventListener('scroll', () => {
  window.requestAnimationFrame(highlightActiveSection);
});
