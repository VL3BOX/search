<template>
	<div class="m-search_all" v-loading="loading">
		<div class="m-filter" :class="{ show }">
			<el-divider content-position="left" @click="changeShow">筛选 <i :class="show ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i></el-divider>
			<div class="m-filter-box" v-for="(item, i) in search" :key="i" v-show="show">
				<span class="u-label">{{ item.label }}</span>
				<el-checkbox-group class="u-group" v-model="item.list">
					<el-checkbox :label="check.label" v-for="(check, key) in filterItem(i)" :key="key">
						{{ check.label + "(" + check.count + ")" }}
					</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>
		<ul class="m-result m-post" v-if="data.length">
			<li class="u-item" v-for="(item, i) in data" :key="i">
				<div class="u-info">
					<a class="u-title" :href="resultLink(item)" target="_blank">
						<i class="u-client" :class="`i-client-${clientKey(item.client)}`">{{ item.client }}</i>
						<span class="u-text">{{ item.title || "无标题" }}</span>
					</a>
					<span class="u-link">
						<span class="u-date">{{ item.updated_at }}</span> @ {{ item.author }}
					</span>
				</div>
				<el-image class="u-img" :src="item.convert_image" fit="fit" v-if="item.convert_image" :preview-src-list="[item.convert_image]"></el-image>
			</li>
		</ul>
		<el-alert v-else class="m-archive-null" title="没有找到相关条目" type="info" center show-icon> </el-alert>
		<el-button class="m-archive-more" type="primary" :class="{ show: hasNextPage }" :loading="loading" @click="appendPage(++page)" icon="el-icon-arrow-down">加载更多</el-button>
		<el-pagination class="m-archive-pages" layout="prev, pager, next" background hide-on-single-page :page-size.sync="per" :total="total" :current-page.sync="page" @current-change="changePage"> </el-pagination>
	</div>
</template>

<script>
import { geSearch } from "@/service/search";
import { __clients, __Root, __OriginRoot } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
	name: "All",
	data: function () {
		return {
			loading: false,
			data: [], //数据列表
			distribution: [], //分布

			total: 1, //总条目数
			pages: 1, //总页数
			page: 1, //当前页数
			per: 10, //每页条目
			show: true,
			search: {
				filter_author: {
					label: "作者",
					list: [],
				},
				filter_category: {
					label: "分类",
					list: [],
				},
				filter_client: {
					label: "客户端",
					list: [],
				},
				filter_name: {
					label: "来源",
					list: [],
				},
			},
			params: {},
		};
	},
	computed: {
		q: function () {
			return this.$store.state.q;
		},
		hasNextPage: function () {
			return this.total > 1 && this.page < this.pages;
		},
	},
	methods: {
		loadData(i = 1, append = false, params) {
			this.loading = true;
			const _params = Object.assign({ q: this.q, pageIndex: i }, params);
			geSearch(_params)
				.then((res) => {
					const data = res.data.data;
					const { distribution, hits, page } = data;
					if (append) {
						this.data = this.data.concat(hits || []);
					} else {
						window.scrollTo(0, 0);
						this.data = hits || [];
					}
					this.distribution = this.filterGroup(distribution);
					this.total = page.total;
					this.pages = page.pageTotal;
					console.log(this.distribution);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		clientKey(val) {
			let _key = "std";
			for (const key in __clients) {
				if (__clients[val] == val) {
					_key = key;
				}
			}
			return _key;
		},
		filterGroup(data) {
			return Object.keys(data).map((key) => {
				let list = [];

				list = Object.keys(data[key]).map((k) => {
					return {
						label: k,
						count: data[key][k],
					};
				});
				list.sort((a, b) => {
					return b.count - a.count;
				});
				return { [`filter_${key}`]: list.length < 10 ? list : list.slice(0, 10) };
			});
		},
		filterItem(key) {
			const list = this.distribution;
			let _list = [];
			for (var i = 0; i < list.length; i++) {
				if (key in list[i]) {
					_list = list[i][key];
				}
			}
			return _list;
		},
		resultLink(item) {
			const client = this.clientKey(item.client);
			const domain = client == "origin" ? __OriginRoot : __Root;
			const link = item.link.indexOf("/") === 0 ? item.link.slice(1) : item.link;
			return domain + link;
		},
		changeShow() {
			this.show = !this.show;
		},
		changePage(i) {
			this.loadData(i);
		},
		appendPage(i) {
			this.loadData(i, true);
		},
	},
	watch: {
		search: {
			deep: true,
			handler: function (obj) {
				const params = {};
				Object.keys(obj).forEach((key) => {
					if (obj[key].list.length) params[key] = obj[key].list.join(",");
				});
				this.loadData(1, false, params);
			},
		},
		q: function () {
			this.page = 1;
			this.loadData();
		},
	},
	mounted: function () {
		this.loadData();
	},
};
</script>

<style lang="less">
.m-search_all {
	.r(4px);
	.mt(20px);
	box-shadow: 0 0 5px #dcdfe6;
	background-color: #fff;
	padding: 0px 20px 30px 20px;

	.m-filter {
		padding: 20px 0 10px 0;
		position: sticky;
		top: 0px;
		z-index: 2;
		background: #fff;
		.el-divider {
			cursor: pointer;
		}
		&.show {
			.pb(20px);
			border-bottom: 1px solid #dcdfe6;
		}
		&-box {
			.flex;
			.mt(10px);
			gap: 5px;
			flex-direction: column;
			.u-group {
				.flex;
				.pl(20px);
				flex-wrap: wrap;
				gap: 10px;
			}
			&:first-child {
				.mt(0);
			}
		}
	}
	.m-result {
		padding: 0 20px;
		.u-item {
			.w(100%);
			.flex;
			.mb(20px);
			gap: 10px;
			justify-content: space-between;
			.u-img {
				.r(10px);
				.h(48px);
			}
			.u-info {
				.flex;
				flex-direction: column;
			}
		}
	}
}
</style>
