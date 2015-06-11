using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Infrastructure
{
    public static class WebConstant
    {
        
        #region 訂單編號產生器
        private static object orderSecretaryIDGenerateKey;
        public static object orderSecretaryIDGenerateInstance
        {
            get
            {
                if (orderSecretaryIDGenerateKey == null)
                    System.Threading.Interlocked.CompareExchange(ref orderSecretaryIDGenerateKey, new object(), null);
                return orderSecretaryIDGenerateKey;
            }
        }
        private static string _orderSecretaryID { get; set; }
        /// <summary>
        /// 201501020001
        /// get拿到都是最新的
        /// 確定放入db再set值
        /// temp = WebConstant.orderSecretaryID;
        /// OOO.orderID = temp;
        /// WebConstant.orderSecretaryID = WebConstant.orderIDAccumulator(temp);
        /// </summary>
        public static string orderSecretaryID
        {
            get
            {
                var strToday = DateTime.Now.ToString("yyyyMMdd");
                if (strToday.Equals(_orderSecretaryID.Substring(0, 8)))
                {
                    return _orderSecretaryID;
                }
                return strToday + "0001";
            }
            set
            {
                _orderSecretaryID = value;
            }
        }
        public static string orderIDAccumulator(string s)
        {            
            return s.Substring(0, 8) + (int.Parse(s.Substring(s.Length - 4)) + 1).ToString("0000");
        }
        #endregion

        #region 自訂參數
        public static string[] _tonLimit = new string[] { "0.6t","1.5t","3.5t" };


        #endregion
    }
}