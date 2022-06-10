// 삭제위해서 ...
const deletebtn = document.querySelectorAll('.deletebtn');
deletebtn.forEach((thisbtn) => {
	thisbtn.addEventListener('click', (e) => {
    let testlist = e.target.dataset.id;
		$.ajax({
			method: 'DELETE',
			url: '/delete',
			data: { _id : testlist },
		}).done((result) => {
      $(e.target).parent('li').fadeOut();
		})
	});
});
