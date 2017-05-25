<template>
    <nav class="aside-nav">
        <ul class="aside-nav-list">
            <router-link to="/admin/article" tag="li" active-class="active" class="aside-nav-list">
                <i class="iconfont icon-blueberrypublish"></i>发布文章
            </router-link>
            <router-link to="/admin/tags" tag="li" active-class="active" class="aside-nav-list">
                <i class="iconfont icon-tag"></i>标签管理
            </router-link>
            <router-link to="/admin/me" tag="li" active-class="active" class="aside-nav-list">
                <i class="iconfont icon-introduce"></i>关于我
            </router-link>
        </ul>
    </nav>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_setting';

.aside-nav
    height: 100%
    background: $dark
    .aside-nav-list
        .aside-nav-list
            height: 48px
            line-height: 48px
            text-align: center
            font-size: 16px
            color: $gray
            cursor: pointer
            .iconfont
                padding-right: 15px
            &.active
                background: rgba(176, 175, 168, 0.3)
                color: $white
            &:hover
                background: rgba(176, 175, 168, 0.3)
</style>