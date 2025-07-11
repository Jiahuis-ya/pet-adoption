<template>
  <div>
    <!-- 上传文件组件 -->
    <el-upload
      ref="upload"
      :action="getActionUrl"
      list-type="picture-card"
      :multiple="multiple"
      :limit="limit"
      :headers="myHeaders"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :on-preview="handleUploadPreview"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadErr"
      :before-upload="handleBeforeUpload"
      :accept="accept"
    >
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip" style="color:#838fa1;">{{tip}}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>
<script>
import storage from "@/utils/storage";
import base from "@/utils/base";
export default {
  data() {
    return {
      // 查看大图
      dialogVisible: false,
      // 查看大图
      dialogImageUrl: "",
      // 组件渲染图片的数组字段，有特殊格式要求
      fileList: [],
      fileUrlList: [],
      myHeaders:{}
    };
  },
  props: ["tip", "action", "limit", "multiple", "fileUrls", "accept"],
  mounted() {
    this.init();
    this.myHeaders= {
      'Token':storage.get("Token")
    }
  },
  watch: {
    fileUrls: function(val, oldVal) {
      //   console.log("new: %s, old: %s", val, oldVal);
      this.init();
    }
  },
  computed: {
    // 计算属性的 getter
    getActionUrl: function() {
      // return base.url + this.action + "?token=" + storage.get("token");
      return `/${this.$base.name}/` + this.action;
    }
  },
  methods: {
    // 初始化
    init() {
        // console.log(typeof this.fileUrls, this.fileUrls, "console.log(this.fileUrls);");
      if (this.fileUrls) {
        this.fileUrlList = this.fileUrls.split(",");
        let fileArray = [];
        this.fileUrlList.forEach(function(item, index) {
          var url = item;
          var name = index;
          var file = {
            name: name,
            url: url
          };
          fileArray.push(file);
        });
        this.setFileList(fileArray);
      }
    },
    handleBeforeUpload(file) {
      if(this._props.accept) {
        const accept = this._props.accept;
        // 将字符串转换为数组，并去除每个元素前后的空格
        const acceptedExtensions = accept.split(', ').map(ext => ext.trim());
        
        // 获取文件的扩展名（假设fileName是文件的完整名称）
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop().toLowerCase(); // 获取最后一个点后的部分，并转换为小写
        
        // 检查文件的扩展名是否在允许的扩展名数组中
        const isValidExtension = acceptedExtensions.includes(`.${fileExtension}`);
        
        if (isValidExtension) {
          // console.log("文件扩展名有效！");
        } else {
          this.$message.warning("上传文件只能是jpg、png格式的图片!");
          return false;
        }

      }

      if(this._props.uploadSize) {
        const isLt2M = file.size / 1024 / 1024 < this._props.uploadSize;
  
        if (!isLt2M) {
          this.$message.warning('上传图片大小不能超过 2MB!');
          return false;
        }
      }
      

    },
    // 上传文件成功后执行
    handleUploadSuccess(res, file, fileList) {
      if (res && res.code === 0) {
        fileList[fileList.length - 1]["url"] =
          this.$base.url + "upload/" + file.response.file;
        this.setFileList(fileList);
        this.$emit("change", this.fileUrlList.join(","));
      } else {
        this.$message.error(res.msg);
      }
    },
    // 图片上传失败
    handleUploadErr(err, file, fileList) {
      this.$message.error("文件上传失败");
    },
    // 移除图片
    handleRemove(file, fileList) {
      this.setFileList(fileList);
      this.$emit("change", this.fileUrlList.join(","));
    },
    // 查看大图
    handleUploadPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 限制图片数量
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传${this.limit}张图片`);
    },
    // 重新对fileList进行赋值
    setFileList(fileList) {
      var fileArray = [];
      var fileUrlArray = [];
      // 有些图片不是公开的，所以需要携带token信息做权限校验
      var token = storage.get("token");
      fileList.forEach(function(item, index) {
        var url = item.url.split("?")[0];
        var name = item.name;
        var file = {
          name: name,
          url: url + "?token=" + token
        };
        fileArray.push(file);
        fileUrlArray.push(url);
      });
      this.fileList = fileArray;
      this.fileUrlList = fileUrlArray;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
