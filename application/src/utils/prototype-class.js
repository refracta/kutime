const pageUnit = 100;

function Paginator() {
	this.dataList = [];
	this.currentPage = 0;
	this.hasNext = false;
}

Paginator.prototype.assign = function (newList) {
	this.dataList = newList || [];
	this.currentPage = 0;
	this.hasNext = (this.dataList.length > 0);
};

Paginator.prototype.count = function () {
	return this.dataList.length;
};

Paginator.prototype.getNext = function () {
	if (!this.hasNext) {
		return null;
	}

	const startIndex = pageUnit * this.currentPage;
	const endIndex = pageUnit * (this.currentPage + 1);
	const slice = this.dataList.slice(startIndex, endIndex);

	this.currentPage += 1;

	if (this.dataList.length <= this.currentPage * pageUnit) {
		this.hasNext = false;
	}

	return slice;
};

module.exports = {
	Paginator,
};
